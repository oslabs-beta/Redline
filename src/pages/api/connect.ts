import type { NextApiRequest, NextApiResponse } from 'next';
import { connectRedis } from '../../../library/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    // const connection = await 
    connectRedis(req.body)
    .then(connection => {
      // console.log('in post, cxn', connection)
      if(connection) { // if successfully connected, return 200 status code
        return res.status(200).send(connection);
      } 
    })
    .catch(error => {
      // console.log('in post, error', error)
      return res.status(404).send(error)
    })
  }
}
