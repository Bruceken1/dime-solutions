const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // serves your Vite build

// Contact form endpoint
app.post('/send-contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await resend.emails.send({
      from: 'Dime Solutions <onboarding@resend.dev>', // change to your verified domain
      to: ['support@dime-solutions.co.ke'], // your email
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ success: false });
  }
});

// Free Audit form endpoint
app.post('/send-audit', async (req, res) => {
  const { companyName, contactName, email, phone, industry, auditNotes } = req.body;

  try {
    await resend.emails.send({
      from: 'Dime Solutions <onboarding@resend.dev>',
      to: ['support@dime-solutions.co.ke'],
      subject: `New Free Audit Request from ${companyName}`,
      html: `
        <h2>New Audit Request</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Contact:</strong> ${contactName} (${email})</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Industry:</strong> ${industry || 'N/A'}</p>
        <p><strong>Notes:</strong><br>${auditNotes}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
