import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fastAPIUrl = process.env.FASTAPI_URL || 'http://localhost:8000';
    const response = await fetch(`${fastAPIUrl}/api`);

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    // Set SSE headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Pipe the FastAPI streaming response to the client
    const reader = response.body?.getReader();
    if (!reader) {
      res.status(500).json({ error: 'No response body from FastAPI' });
      return;
    }

    const decoder = new TextDecoder();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }
    } finally {
      reader.cancel();
    }

    res.end();
  } catch (error) {
    console.error('Error generating business idea:', error);
    res.status(500).json({ error: 'Failed to generate business idea' });
  }
}