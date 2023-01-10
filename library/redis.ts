import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { Metrics, Units, MetricCollection, Endpoint } from '../types/types';

let redis: Redis;
export const connectRedis = (body: Endpoint) => { // input of host, port, password to connect Redis client
    // deconstruct the hostname, port and password from the frontend request body
    const { host, port, password, nickname } = body;
  redis = new Redis({ // default to 6379, but should connect when db info submitted via sidebar
    host,
    port,
    password,
  });
  // console.log('in redis.ts conn')
  return redis.on('connect', () => {
    console.log(`Connected to Redis endpoint ${nickname}`);
    return true;
  })
};

export const disconnectRedis = () => {
  // console.log(redis);
  redis.disconnect();
}

export const getMetrics = async () => { // depending on 'current' db (hold in state), fetch metrics from that db

  if(redis) {
    try {
      // Grab redis data metrics
      const data = await redis.info();
      // Returned data string from Redis to be cleaned up and passed into an array. The data in the array should be a string.
      const cleanData: string[] = data
        .trim()
        .replace(/[' ']/g, '_')
        .split('\r\n');

        const allData: Metrics = {};
      const keys = Object.keys(Units);

      cleanData.forEach((metric: string) => {
        const [metricKey, metricVal]: string[] = metric.split(':');
        if (metricKey && metricVal && keys.includes(metricKey))
          allData[metricKey] = +metricVal; // { data: +metricVal, unit: mc[metricKey] };
      });
      // const keysOfMetricCollection = keys<MetricCollection>();
      // allData is an object w/ key-val pairs --> loop thru keys and see if matches a key in MetricCollection
      return allData;
    } catch (err) {
      // return res.status(400).send({
      //   success: false,
      //   log: `Error occured when getting metrics, ${err}`,
      // });
      console.log(err);
    }
  } else {
    console.log('not conn')
  }
};
