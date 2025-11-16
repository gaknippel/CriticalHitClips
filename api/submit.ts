import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend('REMOVED');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'criticalhitclips@protonmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});