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
  let percentA;
  let percentB;
  if (pieMetric) {
    percentA =
      pieMetric.used_memory /
      (pieMetric.used_memory_dataset - pieMetric.used_memory_startup);
    percentB = 100 - percentA;
  }
  return (
    <div>
      <PieChart pieData={percentA && percentB ? [percentA, percentB] : [0]} />
      <LineGraph lineData={metrics.map((metric) => metric.used_memory)} />
      {/* <BarChart /> */}
    </div>
  );
}
