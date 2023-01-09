import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineGraph from './LineGraph';
import { MetricCollection } from '../../types/types';

interface containerProps {
  metrics: MetricCollection[];
}

export default function MetricContainer(props: containerProps): JSX.Element {
  const { metrics } = props;
  const pieMetric = metrics[metrics.length - 1];
  let usedMem;
  let hitRate;
  if (pieMetric) {
    console.log(pieMetric);
    usedMem =
      pieMetric.used_memory /
      (pieMetric.used_memory_dataset - pieMetric.used_memory_startup);
    hitRate =
      pieMetric.keyspace_hits /
      (pieMetric.keyspace_hits + pieMetric.keyspace_misses);
  }
  return (
    <div style={{ display: 'grid', gridTemplateAreas: `'line bar' 'pie pie` }}>
      <LineGraph lineData={metrics.map((metric) => metric.used_memory)} />
      <PieChart
        pieData={usedMem ? [usedMem, 100 - usedMem] : [0]}
        name='Memory Usage'
        labels={['Memory Used', 'Memory Remaining']}
      />
      <PieChart
        pieData={hitRate ? [hitRate, 100 - hitRate] : [0]}
        name='Hit Rate'
        labels={['Hits', 'Misses']}
      />
      {/* <BarChart /> */}
    </div>
  );
}
