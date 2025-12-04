import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  const {name: submitterName, clipURL, message} = req.body;  


try {


const timestamp = new Date().toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});



const uniqueId = Date.now().toString(36);
const subject = `Clip Submission #${uniqueId}`;


await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'criticalhitclips@protonmail.com',
  subject: subject,
  html: `
          <h3>New Clip Submission:</h3>
          <p><strong>Name:</strong> ${submitterName || 'Not provided'}</p>
          <p><strong>URL:</strong> <a href="${clipURL}">${clipURL}</a></p>
          <p><strong>Message:</strong> ${message || 'Not provided'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
  });

  res.status(200).json({ status: 'OK' });
}

catch (error){

  res.status(500).json({error: 'failed to send email.'});
}

};