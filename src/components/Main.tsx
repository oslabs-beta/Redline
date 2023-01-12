import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import MetricContainer from './MetricContainer';
import { MetricCollection, Endpoint } from '../../types/types';
import NavBar from './NavBar'; 

export default function Main() {
  // Declare state that we pass down to sidebar. Sidebar is where the user is entering the endpoints and where the declared state will be updated.
  const [metricEndpoint, setMetricEndpoint] = useState<Endpoint>();
  const [connected, isConnected] = useState<Boolean>();
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
    // console.log('datafetch', connected);
    if(connected) { // if connected, then set fetch interval
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);      
    }
  }, [connected, delay]); // when endpoint changes, clear previous interval and start new one

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
    connectEndpoint() // attempt to connect when endpoint is updated    

    return () => { if (connected) disconnectEndpoint() } // only if connected, disconnect from endpoint when endpoint is changed
    // separate use effect for disconnecting? changed endpoint? or connected?
    async function connectEndpoint() {
      if (metricEndpoint) { // only attempt to connect if endpoint is set
        try {
          const response = await axios({
            url: '/api/connect',
            method: 'POST',
            data: metricEndpoint // uses current endpoint as body sent in request
          })        
          console.log(response);
          // if(response.status === 200) { // if successful disconnect, reset metrics array for new endpoint
          // console.log('Connected to Redis endpoint:', metricEndpoint.nickname)
          isConnected(true); // if no error, set current connected state to true       
        } catch (err) {
          console.log('Error:', err)
          console.log('Could not connect to:', metricEndpoint.nickname)
          isConnected(false); // error connecting, set state to false
        }
      }
    }

    async function disconnectEndpoint() {
      if (metricEndpoint) { // only attempt to disconnect if endpoint is set
        const response = await axios.get('/api/disconnect')
        if(response.status === 200) { // if successful disconnect, reset metrics array for new endpoint
          setMetrics([]); // reset metrics array
          console.log('Disconnected from:', metricEndpoint.nickname)
        } else {
          console.log(response.status);
        }
      }
    }
  }, [metricEndpoint])

  return (
    <div>
      {/* <button onClick={}>GET LATENCY</button> */}
      <button onClick={ () => setMetricEndpoint({'host': '127.0.0.1', 'port': 6379, 'password': '', 'nickname': 'nickname'}) }>CONNECT TO local</button>
      <button onClick={ () => setMetricEndpoint({'host': 'redis-12203.c289.us-west-1-2.ec2.cloud.redislabs.com', 'port': 12202, 'password': 'GzxNr6qE7kXSHH2boTMycxZQXo9wicSE', 'nickname': 'NA-free-db'}) }>CONNECT TO NA-free-db</button>
      <NavBar />
      <div style={{ display: 'flex' }}>
        <Sidebar setMetricEndpoint={setMetricEndpoint}/>
        <MetricContainer metrics={metrics} />
      </div>
    </div>
  );
}
