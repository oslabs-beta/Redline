import React, { useState, useEffect } from 'react';
import { CategoryScale, Chart, registerables } from 'chart.js';
import { setLabels } from 'react-chartjs-2/dist/utils';
import { Line } from 'react-chartjs-2';
import { Units } from '../../types/types';
import Alerts from './Alerts';
import styles from './styles/Charts.module.scss';

Chart.register(...registerables);

interface lineProps {
  lineData: number[];
  title: string;
  axesLabels: string[];
}

export default function LineGraph({
  lineData,
  title,
  axesLabels,
}: lineProps): JSX.Element {
  const labels: number[] = [];
  const metric: string = title;
  const unit: string = 'bytes';

  lineData.forEach((el, ind) => {
    labels.push(ind); 
  });
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
  return (
    <div className={styles.graphWrapper}>
      <h2>{title}</h2>
      <Line
        data={data}
        options={{
          plugins: {
            title: { display: true },
            legend: { display: false },
          },
          scales: {
            x: {
              title: { display: true, text: axesLabels[0] },
            },
            y: {
              title: { display: true, text: axesLabels[1] },
              beginAtZero: true,
            },
          },
        }}
      />
      <Alerts data={lineData} metric={metric} unit={unit} />
    </div>
  );
}
