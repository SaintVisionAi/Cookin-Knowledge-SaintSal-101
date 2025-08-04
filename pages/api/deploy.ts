import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;

  const validKey = '1cb9cbba8c00ad2db02d114ffdbc7385cd9027ee';

  if (method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = headers['x-api-key'];
  if (auth !== validKey) return res.status(401).json({ error: 'Unauthorized' });

  console.log('🔥 Deploy trigger received from SaintSal Core Agent');

  return res.status(200).json({ message: 'Deploy triggered successfully 🚀' });
}
