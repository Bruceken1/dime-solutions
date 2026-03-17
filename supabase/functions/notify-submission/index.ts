// supabase/functions/notify-submission/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "https://esm.sh/resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { type, data } = await req.json()

    if (!type || !data) {
      throw new Error("Missing type or data")
    }

    let subject = ""
    let html = ""
    let text = ""

    const businessEmail = "support@dimesolutions.co.ke"

    if (type === "contact") {
      subject = `New Contact Form Submission from ${data.name}`
      html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Message:</strong><br>${data.message}</p>
      `
      text = `New Contact Message\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nMessage: ${data.message}`
    } 
    else if (type === "audit") {
      subject = `New Audit Request from ${data.name}`
      html = `
        <h2>New Audit Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || "Not provided"}</p>
        <p><strong>Service Needed:</strong> ${data.service}</p>
        <p><strong>Details:</strong><br>${data.details}</p>
      `
      text = `New Audit Request\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\nService: ${data.service}\nDetails: ${data.details}`
    } 
    else if (type === "career") {
      subject = `New Career Application from ${data.name}`
      html = `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Experience:</strong> ${data.experience} years</p>
        <p><strong>Message/Cover Letter:</strong><br>${data.message}</p>
      `
      text = `New Career Application\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPosition: ${data.position}\nExperience: ${data.experience} years\nMessage: ${data.message}`
    } 
    else {
      throw new Error("Invalid submission type")
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Dime Solutions <notifications@dimesolutions.co.ke>",   // Change after verifying domain in Resend
      to: [businessEmail],
      reply_to: data.email,
      subject: subject,
      html: html,
      text: text,
    })

    if (error) {
      console.error("Resend error:", error)
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    )

  } catch (error: any) {
    console.error("Function error:", error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    )
  }
})
