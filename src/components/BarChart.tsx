import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { isPropertySignature } from 'typescript';
import Alerts from './Alerts'; 
import styles from './styles/Charts.module.scss';

interface barProps {
  barData: number[][];
  name: string;
  labels: string[];
}

// renders bar chart on landing page
export default function BarChart({ barData, name, labels }: barProps) {
  const metric: string = 'Memory Usage';
  const unit: string = 'bytes';
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };
  const x_axis = ['-8.00', '-6.00', '-4.00', '-2.00'];
  const data = {
    labels: x_axis,
    datasets: [
      {
        label: labels[0],
        data: barData.map((arr) => arr[0]),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: labels[1],
        data: barData.map((arr) => arr[1]),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };

  return (
    <div className={styles.graphWrapper}>
      <h2>{name}</h2>
      <Bar options={options} data={data} />
      <Alerts data={barData} metric={metric} unit={unit}/>
    </div>
  );
}
