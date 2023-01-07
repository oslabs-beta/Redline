import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

interface pieProps {
  pieData: number[];
  name: string;
  labels: string[];
}

export default function PieGraph(props: pieProps): JSX.Element {
  // loop through the data we recieve - we should get back an array of objects
  return (
    <div>
      <h2>{props.name}</h2>
      <Pie
        className='pie'
        datasetIdKey='byType'
        data={{
          labels: props.labels, //['memory used', 'memory remaining'],
          datasets: [
            {
              data: props.pieData,
              backgroundColor: [
                '#3e95cd',
                '#8e5ea2',
                '#3cba9f',
                '#e8c3b9',
                '#c45850',
                '#f2bf77',
                '#eb91e9',
                '#9fde92',
              ],
            },
          ],
        }}
        options={{
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        }}
      />
    </div>
  );
}
