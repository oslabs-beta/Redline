import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { Metrics, Units, MetricCollection } from '../types/types';

export const connectRedis = () => {
  // input of host, port, password to connect Redis client
  return new Redis({
    // host: host,
    // port: port,
    // password: password,
  });
};

export const getMetrics = async () => {
  // deconstruct the hostname, port and password from the frontend request body
  // const { host, port, password } = req.body;

  try {
    // Connect to Redis
    // * All the values in the Redis instance (host, port, password should be stored in state and passed along in the request body)
    const redis = connectRedis();

    // Grab redis data metrics
    const data = await redis.info();
    // Returned data string from Redis to be cleaned up and passed into an array. The data in the array should be a string.
    const cleanData: string[] = data
      .trim()
      .replace(/[' ']/g, '_')
      .split('\r\n');
    // let allData: MetricCollection = {};
    const allData: Metrics = {};
    const keys = Object.keys(Units);
    // keys.forEach(key => {
    //   allData[key] = undefined;
    // })
    // console.log(keys);
    cleanData.forEach((metric: string) => {
      const [metricKey, metricVal]: string[] = metric.split(':');
      if (metricKey && metricVal && keys.includes(metricKey))
        allData[metricKey] = +metricVal; // { data: +metricVal, unit: mc[metricKey] };
    });
    // const keysOfMetricCollection = keys<MetricCollection>();
    // allData is an object w/ key-val pairs --> loop thru keys and see if matches a key in MetricCollection
    //if so, add key-val pair
    //if not, skip
    // need to loop through each key and add unit
    return allData; // res.status(200).json({ allData });
  } catch (err) {
    // return res.status(400).send({
    //   success: false,
    //   log: `Error occured when getting metrics, ${err}`,
    // });
    console.log(err);
  }
};
