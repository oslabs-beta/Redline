import type { NextApiRequest, NextApiResponse } from "next";
import { getMetrics } from '../../../library/redis'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 try {
  // Logic for specific charts 
  if (req.method == 'GET') {
    // adjust below 
    const used_memory = await getMetrics();
    // adjust return 
    res.status(200).json({ used_memory })
  }
 } catch(err) {
  // add error handling 
 }
};

