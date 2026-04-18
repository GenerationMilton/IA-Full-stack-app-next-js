import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Proxy the request to FastAPI backend
    const response = await fetch('http://localhost:8000/api');

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error('Error proxying to FastAPI:', error);
    res.status(500).json({ error: 'Failed to fetch from FastAPI backend' });
  }
}