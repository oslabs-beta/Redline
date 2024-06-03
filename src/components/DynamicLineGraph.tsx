import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Units, MetricCollection } from '../../types/types';
import Alerts from './Alerts';
import DropDown from './DropDown';
import styles from './styles/Charts.module.scss';

Chart.register(...registerables);

interface scatterProps {
  metrics: MetricCollection[];
}

// customizable line graph
export default function DynamicLineGraph({
  metrics,
}: scatterProps): JSX.Element {
  const [stateY, setStateY] = useState<string>('');
  const [lineData, setLineData] = useState<number[]>([]);
  const [lineTitle, setLineTitle] = useState<string>('');
  const [lineUnit, setLineUnit] = useState<string>('');

  let tempArr = [];
  for (let i = 0; i < metrics.length; i++) {
    if (stateY !== '') {
      tempArr.push(metrics[i][stateY]);
    }
  }

  const labels: number[] = [];
  lineData.forEach((el, ind) => {
    labels.push(ind);
  });

  useEffect(() => {
    if (stateY) {
      let tempArr = [];
      let title = '';
      let unit = '';
      console.log('inside effect true statement');
      console.log('stateY inside useEffect: ', stateY);
      console.log('metrics is: ', metrics)
      for (let i = 0; i < metrics.length; i++) {
        console.log('metrics[i] is: ', metrics[i]);
        if (stateY !== '') {
          tempArr.push(metrics[i][stateY]);
          title = stateY;
          unit = Units[stateY];
          console.log('tempArr inside useEffect: ', tempArr);
          console.log('title inside useEffect: ', title);
          console.log('unit inside useEffect: ', unit);
        }
      }
      setLineData(tempArr);
      setLineTitle(title);
      setLineUnit(unit);
    }
  }, [stateY, metrics]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: lineData,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  console.log('stateY is: ', stateY);

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.header}>
        <DropDown
          axisState={stateY}
          setStateFn={setStateY}
          category={'a metric'}
        />
        <h2>vs Time</h2>
      </div>
      <Line
        data={data}
        options={{
          plugins: {
            title: { display: true },
            legend: { display: false },
          },
          scales: {
            x: {
              title: { display: true, text: 'Elapsed time (seconds)' },
            },
            y: {
              title: { display: true, text: Units[stateY] },
              beginAtZero: true,
            },
          },
        }}
      />
      <Alerts
        data={lineData}
        metric={lineTitle}
        unit={Units[stateY]}
        selectedMetric={stateY}
      />
    </div>
  );
}
