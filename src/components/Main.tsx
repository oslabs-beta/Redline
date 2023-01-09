import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import MetricContainer from './MetricContainer';
import { MetricCollection } from '../../types/types';
import NavBar from './NavBar';

export default function Main() {
  /* Declare state that we pass down to sidebar. Sidebar is where the user is entering the endpoints and where the declared state will be updated.

  */
  const [endpoint, setEndpoint] = useState();
  const [metrics, setMetrics] = useState<MetricCollection[]>([]); //store array of metric object instances (that updates every 2s)
  // const [pieData, setPieData] = useState('');
  // const [lineData, setLineData] = useState();
  // const [barData, setBarData] = useState();

  // Grab the redis metrics
  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/retrieveMetrics'
        );
        // console.log(response.data);
        if (metrics.length == 4) {
          // <-- add variable set by user potentially
          setMetrics(() => [...metrics.slice(-3), response.data]); //[{metrics1}, {metrics2}, {metrics3}]
        } else {
          setMetrics(() => [...metrics, response.data]);
        }
        // console.log(metrics);
        // setMetrics(response.data.allData);
        // setPieData(response.data.allData.used_memory_dataset_perc); //setPieData(resp.data);
      } catch (err) {
        console.log(err);
      }
    }, 2_000);
  }, [metrics]);

  // function intervalAction() {
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

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <MetricContainer metrics={metrics} />
      <NavBar />
    </div>
  );
}
