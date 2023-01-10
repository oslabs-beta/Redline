import type { NextApiRequest, NextApiResponse } from 'next';
import { connectRedis } from '../../../library/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    // console.log('in connect.ts', req.body)
    if(connectRedis(req.body)) { // if successfully connected, return 200 status code
      return res.status(200).send('Connected to Redis endpoint');
    } 
  }
}
