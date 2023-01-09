import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { isPropertySignature } from 'typescript';

interface barProps {
  barData: number[] | number[][];
  name: string;
  labels: string[];
}

export default function BarChart(props: barProps) {
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
  const labels = ['-8.00', '-6.00', '-4.00', '-2.00'];
  const data = {
    labels,
    datasets: [
      {
        label: props.labels[0],
        data: props.barData.map((arr) => arr[0]),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: props.labels[1],
        data: props.barData.map((arr) => arr[1]),
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
      <h2>{props.name}</h2>
      <Bar options={options} data={data} />
    </div>
  );
}
