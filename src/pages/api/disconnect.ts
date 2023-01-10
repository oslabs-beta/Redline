import type { NextApiRequest, NextApiResponse } from 'next';
import { disconnectRedis } from '../../../library/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    // console.log('in connect.ts')
    disconnectRedis() // if successfully connected, return 200 status code
    return res.status(200).send('Disconnected from Redis endpoint');
  }
}
