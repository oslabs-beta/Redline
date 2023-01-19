import type { NextApiRequest, NextApiResponse } from 'next';
import { getMetrics } from '../../../library/redis';
import { Metrics } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Logic for specific charts
    if (req.method == 'GET') {
      try {
        const newMetric = await getMetrics();
        return res.status(200).json(newMetric);
      } catch (err) {
        return res.status(400).send(err);
      }
    }
}
