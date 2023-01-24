import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import MetricContainer from './MetricContainer';
import { MetricCollection, Endpoint } from '../../types/types';
import NavBar from './NavBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './styles/Main.module.scss';

export default function Main() {
  // declare state that we pass down to sidebar. sidebar is where the user is entering the endpoints and where the declared state will be updated.
  const [metricEndpoint, setMetricEndpoint] = useState<Endpoint>();
  const [connected, isConnected] = useState<Boolean>();
  const [metrics, setMetrics] = useState<MetricCollection[]>([]); //store array of metric object instances (that updates every X sec)
  const [delay, setDelay] = useState(2000); // default interval is 2000ms

  const savedCallback = useRef(retrieveData); // use retrieveData fn through useRef so it has access to updated metrics
  savedCallback.current = retrieveData;

  const { user } = useUser();

  // checks to see if the user that has signed in/created an account is already in the database
  async function checkUser() {
    try {
      if (user) {
        const response = await axios.post('api/controllers/createUser', {
          emailaddress: user.name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser();
  }, [user]);

  useEffect(() => {
    // setup data fetching interval
    if (connected) {
      // if connected, then set fetch interval
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [connected, delay]); // when endpoint changes, clear previous interval and start new one

  async function retrieveData() {
    try {
      const response = await axios.get('/api/retrieveMetrics');
      if (response.data !== '') {
        if (metrics.length == 5) {
          setMetrics([...metrics.slice(-4), response.data]); 
        } else {
          setMetrics([...metrics, response.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    connectEndpoint(); // attempt to connect when endpoint is updated

    return () => {
      if (connected) disconnectEndpoint(); // only if connected, disconnect from endpoint when endpoint is changed
    }; 
    async function connectEndpoint() {
      if (metricEndpoint) {
        // only attempt to connect if endpoint is set
        try {
          const response = await axios({
            url: '/api/connect',
            method: 'POST',
            data: metricEndpoint, // uses current endpoint as body sent in request
          });
          console.log(response);
          isConnected(true); 
        } catch (err) {
          console.log('Could not connect to: ', metricEndpoint.nickname, 'Error message: ', err);
          isConnected(false); 
        }
      }
    }

    async function disconnectEndpoint() {
      if (metricEndpoint) {
        // only attempt to disconnect if endpoint is set
        const response = await axios.get('/api/disconnect');
        if (response.status === 200) {
          // if successful disconnect, reset metrics array for new endpoint
          setMetrics([]);
          console.log('Disconnected from:', metricEndpoint.nickname);
        } else {
          console.log(response.status);
        }
      }
    }
  }, [metricEndpoint]);

  return (
    <div className={styles.bodyContainer}>
      <NavBar />
      <div className={styles.mainContainer}>
        <Sidebar setMetricEndpoint={setMetricEndpoint} />
        <MetricContainer metrics={metrics} />
      </div>
    </div>
  );
}
