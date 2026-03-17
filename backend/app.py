from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Resumae Backend - xAI Grok")

# Allow your frontend to call this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your Railway URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
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
        messages = [
            {"role": "system", "content": "You are a professional career coach helping build a resume through natural conversation. Be helpful, encouraging, and ask one question at a time."}
        ]
        messages.extend(req.history)
        messages.append({"role": "user", "content": req.message})

        response = client.chat.completions.create(
            model="grok-4.1-fast",   # ← cheapest & fastest for resume work
            messages=messages,
            temperature=0.7,
            max_tokens=800
        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/tailor")
async def tailor_endpoint(req: TailorRequest):
    try:
        prompt = f"""
        You are an expert resume writer and ATS optimizer.
        Here is the user's current resume:
        {req.resume_text}

        Here is the job description:
        {req.job_description}

        Rewrite the resume to perfectly match this job. 
        Keep it truthful, use strong action verbs, and optimize for ATS.
        Return ONLY the full rewritten resume in clean markdown format.
        """

        response = client.chat.completions.create(
            model="grok-4.1-fast",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=1200
        )

        return {"tailored_resume": response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "Resumae xAI backend is running"}
