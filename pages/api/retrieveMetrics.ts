import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import next from "next";

const getMetrics = async (req: NextApiRequest, res: NextApiResponse) => {
  // deconstruct the hostname, port and password from the frontend request body
  const { host, port, password } = req.body;

  try {
    // Connect to Redis 
    // * All the values in the Redis instance (host, port, password should be stored in state and passed along in the request body)
    const redis = new Redis({
      host: host,
      port: port,
      password: password,
    });

    // Establish that Metrics will be an object with both keys and values as strings. 
    interface Metrics {
      [metricKey: string]: string;
    }

    // Grab redis data metrics 
    const data = await redis.info();
    // Returned data string from Redis to be cleaned up and passed into an array. The data in the array should be a string. 
    const cleanData: string[] = data
      .trim()
      .replace(/[' ']/g, "_")
      .split("\r\n");
    let allData: Metrics = {};

    cleanData.forEach((metric: string) => {
      const [metricKey, metricVal] = metric.split(":");
      if (metricKey && metricVal) allData[metricKey] = metricVal;
    });
    return res.status(200).json({ allData });
  } catch (err) {
    return res
      .status(400)
      .send({
        success: false,
        log: `Error occured when getting metrics, ${err}`,
      });
  }
};

export default getMetrics;

