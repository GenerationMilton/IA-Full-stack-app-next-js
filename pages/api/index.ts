import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messageContent =
      req.method === 'POST'
        ? buildConsultationPrompt(req.body)
        : 'Come up with a new business idea for AI Agents';

    const completion = await openai.chat.completions.create({
      model: 'gpt-5.4-nano',
      messages: [
        { role: 'user', content: messageContent }
      ],
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    for await (const chunk of completion) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        // JSON-encode chunks so whitespace/newlines are preserved safely in SSE frames.
        res.write(`data: ${JSON.stringify(text)}\n\n`);
      }
    }

    res.end();
  } catch (error) {
    console.error('Error generating business idea:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate business idea' });
    } else {
      res.write('event: error\ndata: Failed to generate business idea\n\n');
      res.end();
    }
  }
}

function buildConsultationPrompt(body: NextApiRequest['body']): string {
  const patientName = String(body?.patient_name ?? '').trim();
  const dateOfVisit = String(body?.date_of_visit ?? '').trim();
  const notes = String(body?.notes ?? '').trim();

  return `You are provided with notes written by a doctor from a patient's visit.
Your job is to summarize the visit for the doctor and provide an email.
Reply with exactly three sections with the headings:
### Summary of visit for the doctor's records
### Next steps for the doctor
### Draft of email to patient in patient-friendly language
Formatting rules:
- Use valid Markdown.
- Put a blank line after each heading.
- Use bullet points for "Next steps for the doctor".
- Keep "Draft of email to patient in patient-friendly language" as a normal email with short paragraphs.

Patient Name: ${patientName || 'Unknown patient'}
Date of Visit: ${dateOfVisit || 'Unknown date'}
Notes:
${notes || 'No notes provided.'}`;
}