import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Toasty from './Toasty'; 

Chart.register(ArcElement);

interface pieProps {
  pieData: number[];
  name: string;
  labels: string[];
}

export default function PieGraph({pieData, name, labels }: pieProps): JSX.Element {
  const metric:string = name
  const unit:string = 'percent'
  // loop through the data we recieve - we should get back an array of objects
  return (
    <div>
      <h2>{name}</h2>
      <Pie
        className='pie'
        datasetIdKey='byType'
        data={{
          labels: labels, //['memory used', 'memory remaining'],
          datasets: [
            {
              data: pieData,
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
      <Toasty data={pieData} metric={metric} unit={unit}/>
    </div>
  );
}
