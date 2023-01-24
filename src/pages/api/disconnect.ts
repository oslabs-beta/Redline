import type { NextApiRequest, NextApiResponse } from 'next';
import { disconnectRedis } from '../../../library/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    disconnectRedis();
    return res.status(200).send('Disconnected from Redis endpoint');
  }
}
