import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets when function restarts)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// rate limit config
const RATE_LIMIT = 3; // max submissions per time window
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitKey(req: VercelRequest): string 
{
  // get IP 
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' 
    ? forwarded.split(',')[0].trim() 
    : req.headers['x-real-ip'] || 'unknown';
  
  return `ip:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } 
{
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // If no record or time window expired, create new record
  if (!record || now > record.resetTime) 
  {
    const resetTime = now + TIME_WINDOW;
    rateLimitMap.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime };
  }

  // check if limit exceeded
  if (record.count >= RATE_LIMIT) 
  {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // increment count
  record.count++;
  rateLimitMap.set(key, record);
  return { allowed: true, remaining: RATE_LIMIT - record.count, resetTime: record.resetTime };
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // check rate limit
  const rateLimitKey = getRateLimitKey(req);
  const { allowed, remaining, resetTime } = checkRateLimit(rateLimitKey);

  if (!allowed) {
    const resetDate = new Date(resetTime);
    return res.status(429).json({ 
      error: 'too many submissions. please try again later (1 hour).',
      resetTime: resetDate.toISOString()
    });
  }

  const {name: submitterName, clipURL, message} = req.body;

  if (!clipURL || typeof clipURL !== 'string') {
    return res.status(400).json({ error: 'Clip URL is required' });
  }

  try 
  {
    new URL(clipURL);
  } 
  catch 
  {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // check URL length (long ahh url)
  if (clipURL.length > 500) {
    return res.status(400).json({ error: 'URL is too long' });
  }

  // check message length
  if (message && message.length > 2500) {
    return res.status(400).json({ error: 'Message is too long' });
  }

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
        <p><strong>IP:</strong> ${rateLimitKey}</p>
      `,
    });

    // add rate limit headers to response
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString());

    res.status(200).json({ 
      status: 'OK',
      remaining: remaining
    });
  }
  catch (error){
    console.error('Email send error:', error);
    res.status(500).json({error: 'Failed to send email. Please try again later.'});
  }
};