import React, { useState, useEffect } from 'react';
import { CategoryScale, Chart, registerables } from 'chart.js';
import { setLabels } from 'react-chartjs-2/dist/utils';
import { Line, Scatter } from 'react-chartjs-2';
import { Units, MetricCollection, Metrics } from '../../types/types';
import Alerts from './Alerts'; 
import DropDown from './DropDown';


Chart.register(...registerables);

interface scatterProps {
  metrics: MetricCollection[]
}

interface scatterPoint {
  x: number,
  y: number
}

export default function ScatterChart({ metrics }: scatterProps): JSX.Element {
  const [stateX, setStateX] = useState<string>('');
  const [stateY, setStateY] = useState<string>('');
  const [scatterData, setScatterData] = useState<scatterPoint[]>([]);
  
  // console.log(lineData);
  const labels: number[] = [];
  // hard codes to be replaced with dynamic logic/info from user
  // const metric:string = title
  // replace the hard coded 'bytes' below with the types from types.ts file based on the x / y axis labels
  const unit:string = 'bytes'

  let tempArr = [];
  for(let i = 0; i < metrics.length; i++) {
    if(stateX !== '' && stateY !== '') {
      tempArr.push({
        x: metrics[i][stateX],
        y: metrics[i][stateY]
      })      
    }
  }

  useEffect(() => {
    if(stateX && stateY) { // check if both are set
      // create array of {x: x, y: y} objects here
      // console.log('in useeffect scatter',scatterData)
      let tempArr = [];
      for(let i = 0; i < metrics.length; i++) {
        if(stateX !== '' && stateY !== '') {
          tempArr.push({
            x: metrics[i][stateX],
            y: metrics[i][stateY]
          })      
        }
      }
      setScatterData(tempArr);
      console.log(tempArr)
    }
  }, [stateX, stateY, metrics]) // metrics as depen as well?

  let data = {
    datasets: [
      {
        label: 'hello',
        data: scatterData, // [array of {x: 10, y: 10}]
        borderColor: 'black',
        borderWidth: 1,
        // xAxisID: 'time',
        // yAxisID: 'y'
      },
    ],
  };
  let options = {
    plugins: {
      title: { display: true },
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: 'x' },
      },
      y: {
        title: { display: true, text: 'y' },
        beginAtZero: true,
      },
    },
  }
  return (
    <div className='graphWrapper'>
      <h2>{stateY} vs {stateX}</h2>
      <DropDown axisState={stateY} setStateFn={setStateY} axis={'Y'}/>
      <DropDown axisState={stateX} setStateFn={setStateX} axis={'X'}/>
      <Scatter
        data={ data }
        options={ options }
      />
      {/* <Alerts data={scatterData} metric={'temp'} unit={unit}/> */}
    </div>
  );
}
