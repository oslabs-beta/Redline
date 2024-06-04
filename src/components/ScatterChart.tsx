import React, { useState, useEffect } from 'react';
import { CategoryScale, Chart, registerables } from 'chart.js';
import { setLabels } from 'react-chartjs-2/dist/utils';
import { Line, Scatter } from 'react-chartjs-2';
import { Units, MetricCollection, Metrics } from '../../types/types';
import DropDown from './DropDown';
import styles from './styles/Charts.module.scss';


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
  
  const labels: number[] = [];
  const unit: string = 'bytes'

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
    if(stateX && stateY) {
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
  }, [stateX, stateY, metrics])

  let data = {
    datasets: [
      {
        label: 'hello',
        data: scatterData, 
        borderColor: 'black',
        borderWidth: 1,
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
        title: { display: true, text: Units[stateX] },
      },
      y: {
        title: { display: true, text: Units[stateY] },
        beginAtZero: true,
      },
    },
  }
  return (
    <div className={styles.graphWrapper}>
      <div className={styles.header}>
        <DropDown axisState={stateY} setStateFn={setStateY} category={'a metric (Y-axis)'}/>
        <h2>vs</h2>
        <DropDown axisState={stateX} setStateFn={setStateX} category={'a metric (X-axis)'}/>        
      </div>
      <Scatter
        data={ data }
        options={ options }
      />
    </div>
  );
}
