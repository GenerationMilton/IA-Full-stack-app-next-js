import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
   
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.4-nano',
      messages: [
        { role: 'user', content: 'Come up with a new business idea for AI Agents' }
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
        res.write(`data: ${text}\n\n`);
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