import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineGraph from './LineGraph';
import { MetricCollection, Units } from '../../types/types';

interface containerProps {
  metrics: MetricCollection[];
}

export default function MetricContainer(props: containerProps): JSX.Element {
  const { metrics } = props;
  const pieMetric = metrics[metrics.length - 1];
  let usedMem;
  let hitRate;
  if (pieMetric) {
    // console.log(pieMetric);
    usedMem =
      pieMetric.used_memory /
      (pieMetric.used_memory_dataset - pieMetric.used_memory_startup);
    hitRate =
      pieMetric.keyspace_hits /
      (pieMetric.keyspace_hits + pieMetric.keyspace_misses);
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `'line bar' 'pie pie'`,
        gridTemplateColumns: '1fr 1fr',
        marginLeft: '5vw',
      }}
    >
      <div style={{ gridTemplateAreas: 'line', width: '30vw' }}>
        <LineGraph lineData={metrics.map((metric) => metric.used_memory)} title={'Memory Usage Over Time'} axesLabels={['Elapsed time (seconds)', 'Bytes']}/>
      </div>
      <div style={{ gridTemplateAreas: 'bar', width: '30vw' }}>
        <BarChart
          barData={metrics.map((metric) => [
            metric.used_memory,
            metric.used_memory_rss - metric.used_memory,
          ])}
          name='Memory Usage'
          labels={['Memory Used', 'Memory Available']}
        />
      </div>
      <div style={{ gridTemplateAreas: 'bar', width: '20vw' }}>
        <PieChart
          pieData={usedMem ? [usedMem, 100 - usedMem] : [0]}
          name='Memory Usage'
          labels={['Memory Used', 'Memory Available']}
        />
      </div>
      <div style={{ gridTemplateAreas: 'bar', width: '20vw' }}>
        <PieChart
          pieData={hitRate ? [hitRate, 100 - hitRate] : [0]}
          name='Hit Rate'
          labels={['Hits', 'Misses']}
        />
      </div>
    </div>
  );
}
