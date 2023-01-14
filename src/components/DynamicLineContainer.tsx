import React, { useState, useEffect } from 'react';
import { CategoryScale, Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { setLabels } from 'react-chartjs-2/dist/utils';
import { Units, MetricCollection, Metrics } from '../../types/types';
import Alerts from './Alerts';
import DropDown from './DropDown';

Chart.register(...registerables);

interface scatterProps {
  metrics: MetricCollection[];
}

// interface linePoint {
//   y: number;
// }

export default function DynamicLineContainer({
  metrics,
}: scatterProps): JSX.Element {
  const [stateY, setStateY] = useState<string>('');
  const [lineData, setLineData] = useState<number[]>([]);
  const [lineTitle, setLineTitle] = useState<string>('');

  // console.log(lineData);
  //   const labels: number[] = [];
  // hard codes to be replaced with dynamic logic/info from user
  // const metric:string = title
  // replace the hard coded 'bytes' below with the types from types.ts file based on the x / y axis labels
  //   const unit: string = 'bytes';

  let tempArr = [];
  for (let i = 0; i < metrics.length; i++) {
    if (stateY !== '') {
      tempArr.push(metrics[i][stateY]);
    }
  }

  useEffect(() => {
    if (stateY) {
      // check if y-axis is set
      // create array of numbers
      let tempArr = [];
      let title = '';
      for (let i = 0; i < metrics.length; i++) {
        if (stateY !== '') {
          tempArr.push(metrics[i][stateY]);
          title = stateY;
        }
      }
      setLineData(tempArr);
      setLineTitle(title);
      //   console.log(tempArr);
    }
  }, [stateY, metrics]); // metrics as depen as well?

  const data = {
    // labels: labels,
    datasets: [
      {
        label: 'hello',
        data: lineData, // [array of data which are nums]
        borderColor: 'black',
        borderWidth: 1,
        // xAxisID: 'time',
        // yAxisID: 'y'
      },
    ],
  };
  //   let data = {
  //     datasets: [
  //       {
  //         label: 'hello',
  //         data: lineData, // [array of {x: 10, y: 10}]
  //         borderColor: 'black',
  //         borderWidth: 1,
  //         // xAxisID: 'time',
  //         // yAxisID: 'y'
  //       },
  //     ],
  //   };
  //   let options = {
  //     plugins: {
  //       title: { display: true },
  //       legend: { display: false },
  //     },
  //     scales: {
  //       x: {
  //         title: { display: true, text: 'x' },
  //       },
  //       y: {
  //         title: { display: true, text: 'y' },
  //         beginAtZero: true,
  //       },
  //     },
  //   };
  return (
    <div className='graphWrapper'>
      <DropDown axisState={stateY} setStateFn={setStateY} axis={'Y'} />
      <h2>vs Time</h2>
      <Line
        data={data}
        // add chart data labels, datasets, options and properties
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
              title: { display: true },
              beginAtZero: true,
            },
          },
        }}
      />
      {/* <Alerts data={scatterData} metric={'temp'} unit={unit}/> */}
    </div>
  );
}
