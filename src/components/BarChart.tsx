import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { isPropertySignature } from 'typescript';
import Toasty from './Toasty'; 


interface barProps {
  barData: number[][];
  name: string;
  labels: string[];
}

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
      // {
      //   label: 'Dummy Data 1',
      //   data: labels.map(() => Math.floor(Math.random() * 100)),
      //   backgroundColor: 'rgb(255, 99, 132)',
      // },
      // {
      //   label: 'Dummy Data 2',
      //   data: labels.map(() => Math.floor(Math.random() * 100)),
      //   backgroundColor: 'rgb(80, 150, 190)',
      // },
    ],
  };

  return (
    <div>
      <h2>{name}</h2>
      <Bar options={options} data={data} />
      <Toasty data={barData} metric={metric} unit={unit}/>
    </div>
  );
}
