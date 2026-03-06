import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BUSINESS_EMAIL = "support@dimesolutions.co.ke";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    console.log(`New ${type} submission received:`, JSON.stringify(data));

    // Build email content based on submission type
    let subject = "";
    let body = "";

    switch (type) {
      case "contact":
        subject = `New Contact Form Submission from ${data.name}`;
        body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\n\nMessage:\n${data.message}`;
        break;
      case "audit":
        subject = `New Free Audit Request from ${data.name}`;
        body = `Name: ${data.name}\nEmail: ${data.email}\nWebsite: ${data.website}\nPhone: ${data.phone || "N/A"}`;
        break;
      case "career":
        subject = `New Career Application from ${data.name}`;
        body = `Name: ${data.name}\nEmail: ${data.email}\nPosition: ${data.position || "Not specified"}\n\nMessage:\n${data.message || "No message"}`;
        break;
      default:
        subject = `New ${type} Submission`;
        body = JSON.stringify(data, null, 2);
    }

    // Try sending via Resend if API key is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Dime Solutions <notifications@dimesolutions.co.ke>",
          to: [BUSINESS_EMAIL],
          subject,
          text: body,
          reply_to: data.email,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("Resend error:", errText);
      } else {
        console.log("Email sent successfully via Resend");
      }
    } else {
      console.log("RESEND_API_KEY not set — email not sent. Submission logged.");
      console.log(`To: ${BUSINESS_EMAIL}\nSubject: ${subject}\n\n${body}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${type} notification processed`,
        emailSent: !!resendApiKey,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error processing notification:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
