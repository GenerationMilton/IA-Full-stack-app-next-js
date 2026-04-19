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
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Come up with a new business idea for AI Agents' }
      ],
    });

    const idea = completion.choices[0]?.message?.content || 'No idea generated';

    res.status(200).send(idea);
  } catch (error) {
    console.error('Error generating business idea:', error);
    res.status(500).json({ error: 'Failed to generate business idea' });
  }
}