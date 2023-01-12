import type { NextApiRequest, NextApiResponse } from 'next';
// import { connectRedis, getLatency } from '../../../library/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    console.log('in latencyhandler')
    // const info = await getLatency();
    return res.status(200);
  }
}
