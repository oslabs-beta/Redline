import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { Metrics, Units, MetricCollection, Endpoint, ServerError } from '../types/types';
let redis: Redis;
let baseMet: Metrics = {};

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
  resetBaseMetrics();
  redis.disconnect();
}

export const getMetrics = async () => { // depending on 'current' db (hold in state), fetch metrics from that db
    // Grab redis data metrics
    const data = await redis.info();
    // Returned data string from Redis to be cleaned up and passed into an array. The data in the array should be a string.
    const redisinfo = require('redis-info').parse(data);

    const rawData: Metrics = {};

    for (const key in Units) {
      if(key === 'keys' || key === 'expires' || key === 'avg_ttl') { // if key is database (val is nested obj)
        if (Object.keys(redisinfo['databases']).length > 0) { // database = { '0': { 'keys': keys, 'expires': expires, 'avg_ttl': avg_ttl } }
          rawData[key] = redisinfo['databases']['0'][key];       
        }
        else {
          rawData[key] = 0;
        }
      }
      else if (key in redisinfo) { // normal key metric found in redisinfo
        rawData[key] = +redisinfo[key];        
      }
    }
    if (Object.keys(baseMet).length === 0) {
      baseMet = {...rawData};
    }
    calcSessionMetrics(rawData);
    console.log(rawData);
    return rawData;
};

const resetBaseMetrics = () => { // reset base metrics compared against
  baseMet = {};
}

const calcSessionMetrics = (data: Metrics) => { // calculate current session metrics
  for (const key in Units) {
    if (!(key in data)) { // if undefined val for key in data, calculate session value
      if (key === 'keyspace_hitratio_session') {
        data[key] = data['keyspace_hits_session'] / (data['keyspace_hits_session'] + data['keyspace_misses_session']);
      }
      else {
        const origKey = key.slice(0,-8);
        data[key] = data[origKey] - baseMet[origKey];        
      }
    }
  }
}

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
