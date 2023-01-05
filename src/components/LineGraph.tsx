import React, { useState, useEffect } from 'react';
import { CategoryScale, Chart, registerables } from "chart.js";
import { setLabels } from "react-chartjs-2/dist/utils";
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

interface lineProps {
  lineData: number[]
}

export default function LineGraph({ lineData } : lineProps): JSX.Element {
  const labels: number[] = [];
  lineData.forEach((el,ind) => {
    labels.push(ind); //[1,2,3,4,5,6]
    // console.log(labels);
  })
  const data = {
    labels: labels,
    datasets: [{
      label: 'hello',
      data: lineData, //[array of data which are nums]
      borderColor: 'black',
      borderWidth: 1,
      // xAxisID: 'time',
      // yAxisID: 'y'
    }]
  }
  return (
    <div style={{'width':'800px'}}>LineGraph
      <Line data={data}
    // add chart data labels, datasets, options and properties
        options={{
          plugins: {
            title: {display: true, text: "hello world"},
            legend: {display: false}
          },
          scales: {
            x: {
              title: { display: true, text: 'Elapsed time (seconds)' },
            },
            y: {
              title: { display: true, text: 'Memory (in bytes)' },
              beginAtZero: true,

            }
          }
        }}
      />
    </div>    
  )

}





