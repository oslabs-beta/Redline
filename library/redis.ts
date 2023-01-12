import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { Metrics, Units, MetricCollection, Endpoint, ServerError } from '../types/types';

let redis: Redis;

export const connectRedis = (body: Endpoint) => { // input of host, port, password to connect Redis client
  // deconstruct the hostname, port and password from the frontend request body
  const { host, port, password, nickname } = body;
  redis = new Redis({ // default to 6379, but should connect when db info submitted via sidebar
    host,
    port,
    password,
    reconnectOnError: () => false, // do not attempt to reconnect if error encountered
    retryStrategy: () => null, // do not attempt to reconnect after failed connection
    lazyConnect: true, // connect manually within promise
  });
  const myPromise = new Promise(function(resolve, reject) {
    redis.on('error', (err) => { // on error, set error log and message, set connection to false
      const newError = { log: err.code, message: { err: err.message } };
      console.log('Error:', newError)
      reject(newError); // send rejected promise w/ error
    })
    redis.on('connect', () => { // on successful connection, set connection to true
      const connection = `Connected to Redis endpoint ${nickname}`
      console.log(connection);
      resolve(connection); // send resolved promise w/ connection string
    })
    redis.connect((e) => {// manually attempt to connect 
      if (e) console.log(e)
    })  
  })

  return myPromise; 
};

export const disconnectRedis = () => {
  // console.log(redis);
  redis.disconnect();
}

export const getMetrics = async () => { // depending on 'current' db (hold in state), fetch metrics from that db
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
    // allData is an object w/ key-val pairs --> loop thru keys and see if matches a key in MetricCollection
    return allData;
};

// export const getLatency = async () => {
//   if(redis) {
//     try {
//       // const help = await redis.call('HELP')
//       // console.log(help);
//       // const doctor = await redis.call('--latency');
//       // console.log(doctor);
//       // redis.config('SET', 'latency-monitor-threshold', '5');
//       const flush = await redis.call('SET', 'latency-monitor-threshold', '5');
//       console.log(flush);
//       const latencyData = await redis.latency('DOCTOR');
//       return latencyData;
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }
