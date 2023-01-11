import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import MetricContainer from './MetricContainer';
import { MetricCollection, Endpoint } from '../../types/types';
import NavBar from './NavBar'; 
import { connect } from 'http2';
import ResponseCache from 'next/dist/server/response-cache';

export default function Main() {
  // Declare state that we pass down to sidebar. Sidebar is where the user is entering the endpoints and where the declared state will be updated.
  const [metricEndpoint, setMetricEndpoint] = useState<Endpoint>();
  const [metrics, setMetrics] = useState<MetricCollection[]>([]); //store array of metric object instances (that updates every X sec)
  const [delay, setDelay] = useState(2000); // default interval is 2000ms

  const savedCallback = useRef(retrieveData); // use retrieveData fn thru useRef so it has access to updated metrics
  savedCallback.current = retrieveData;  

  // function intervalAction() {}
  //   const getData = async () => {
  //     try {
  //       const response = await axios.post(
  //         'http://localhost:3000/api/retrieveMetrics'
  //       );
  //       setMetrics(response.data.allData);
  //       setPieData(response.data.allData.used_memory_dataset_perc);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   setTimeout(() => {
  //     getData();
  //     intervalAction();
  //   }, 2_000);
  // }
  // useInterval(retrieveData, delay)

  useEffect(() => { // setup data fetching interval
    if(metricEndpoint) { // if endpoint is not set, then do not set fetch interval
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);      
    }
  }, [metricEndpoint, delay]); // when endpoint changes, clear previous interval and start new one

  async function retrieveData() {
    try {
      const response = await axios.get('/api/retrieveMetrics');
      // console.log(response.data.used_memory);
      if(response.data !== '') {
        if (metrics.length == 5) {
          // setMetrics((metrics) => [...metrics.slice(-4), response.data]); //[{metrics1}, {metrics2}, {metrics3}]
          setMetrics([...metrics.slice(-4), response.data]); //[{metrics1}, {metrics2}, {metrics3}]
        } else {
          // setMetrics((metrics) => [...metrics, response.data]);
          setMetrics([...metrics, response.data]);
        }        
      }
      console.log(metrics);
      // return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    connectEndpoint(); // attempt to connect when endpoint is updated    
    return () => { disconnectEndpoint() } // disconnect from endpoint when endpoint is changed
    
    async function connectEndpoint() {
      if (metricEndpoint) { // only attempt to connect if endpoint is set
        const response = await axios({
          url: '/api/connect',
          method: 'POST',
          data: metricEndpoint // uses current endpoint as body sent in request
        })     
        if(response.status === 200) { // if successful disconnect, reset metrics array for new endpoint
          console.log('Connected to Redis endpoint:', metricEndpoint.nickname)
        }
        // console.log('connect', response); 
      }
    }
    async function disconnectEndpoint() {
      if (metricEndpoint) { // only attempt to disconnect if endpoint is set
        const response = await axios.get('/api/disconnect')
        if(response.status === 200) { // if successful disconnect, reset metrics array for new endpoint
          setMetrics([]);
          console.log('Disconnected from:', metricEndpoint.nickname)
        } else {
          console.log(response.status);
        }
      }
    }
  }, [metricEndpoint])

  return (
    <div>
      {/* <button onClick={ () => setEndpoint({'host': '127.0.0.1', 'port': 6379, 'password': '', 'nickname': 'nickname'}) }>CONNECT TO local</button>
      <button onClick={ () => setEndpoint({'host': 'redis-12203.c289.us-west-1-2.ec2.cloud.redislabs.com', 'port': 12203, 'password': 'GzxNr6qE7kXSHH2boTMycxZQXo9wicSE', 'nickname': 'NA-free-db'}) }>CONNECT TO NA-free-db</button> */}
      <NavBar />
      <div className='mainContainer'>
        <Sidebar setMetricEndpoint={setMetricEndpoint}/>
        <MetricContainer metrics={metrics} />
      </div>
    </div>
  );
}
