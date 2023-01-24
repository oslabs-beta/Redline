import type { NextApiRequest, NextApiResponse } from 'next';
import { connectRedis } from '../../../library/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    connectRedis(req.body)
    .then(connection => {
      if(connection) { 
        return res.status(200).send(connection);
      } 
    })
    .catch(error => {
      return res.status(404).send(error)
    })
  }
}
