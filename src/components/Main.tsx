import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import MetricContainer from './MetricContainer';

export default function Main() {
  /* Declare state that we pass down to sidebar. Sidebar is where the user is entering the endpoints and where the declared state will be updated.

  const endpoints = {
  'nickname' : {
    host: 'host',
    port: 3000,
    password: 'helloworld'
  }
}
  const pieData = {
    memoryUsage: [50, 50],
    hitRatio: [90,10]
  }

  When the user clicks on their various endpoints, they'll be able to see those specific metrics because we can make a request to the backend only requesting information from the endpoint associated with that nickname.

  */
  const [endpoint, setEndpoint] = useState();
  const [metrics, setMetrics] = useState();
  const [pieData, setPieData] = useState('');
  const [lineData, setLineData] = useState();
  const [barData, setBarData] = useState();

  // Grab the redis metrics
  useEffect(() => {
    intervalAction();
  }, []);

  function intervalAction() {
    const getData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/retrieveMetrics'
        );
        setMetrics(response.data.allData);
        setPieData(response.data.allData.used_memory_dataset_perc);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getData();
      intervalAction();
    }, 2_000);
  }

  return (
    <div>
      <Sidebar />
      <MetricContainer pieData={pieData} lineData={lineData} />
    </div>
  );
}
