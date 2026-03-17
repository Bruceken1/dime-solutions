from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Resumae Backend - Free Hugging Face LLM")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === FREE HUGGING FACE CLIENT ===
client = InferenceClient(
    model="Qwen/Qwen2.5-7B-Instruct",   # Best free model right now for your use case
    token=os.getenv("HF_TOKEN")
)

# ====================== MODELS ======================
class ChatMessage(BaseModel):
    message: str
    history: list = []

class TailorRequest(BaseModel):
    resume_text: str
    job_description: str

# ====================== ENDPOINTS ======================

@app.post("/chat")
async def chat_endpoint(req: ChatMessage):
    try:
        # Build conversation with system prompt
        messages = [
            {"role": "system", "content": "You are a friendly, professional career coach. Help the user build their resume through natural conversation. Ask one question at a time and keep responses concise and encouraging."}
        ]
        messages.extend(req.history)
        messages.append({"role": "user", "content": req.message})

        response = client.chat.completions.create(
            messages=messages,
            temperature=0.7,
            max_tokens=700
        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"HF error: {str(e)}")


@app.post("/tailor")
async def tailor_endpoint(req: TailorRequest):
    try:
        prompt = f"""
You are an expert ATS-optimized resume writer.
Rewrite the following resume to perfectly match this job description.
Keep every achievement truthful. Use strong action verbs. Make it concise and professional.

Resume:
{req.resume_text}

Job Description:
{req.job_description}

Return ONLY the full rewritten resume in clean markdown format. Do not add any extra text.
"""

        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=1200
        )

        return {"tailored_resume": response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"HF error: {str(e)}")


@app.get("/health")
async def health():
    return {"status": "Resumae Hugging Face backend is running (free tier)"}
