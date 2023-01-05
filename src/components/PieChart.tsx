import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

interface pieProps {
  pieData: string
}

export default function PieGraph({pieData}: pieProps): JSX.Element {
    // loop through the data we recieve - we should get back an array of objects 
  const percent = parseFloat(pieData);
  return (
    <div>
      <h2>Memory Usage</h2>
      <Pie
        className='pie'
        datasetIdKey='byType'
        data={{
        labels: ['memory used', 'memory remaining'],
          datasets: [
            {
              data: [percent, 100 - percent],
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
