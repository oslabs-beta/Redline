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
  return (
    <div>
      {/* <PieChart pieData={props.pieData} /> */}
      <LineGraph lineData={metrics.map((metric) => metric.used_memory)} />
      {/* <BarChart /> */}
    </div>
  );
}
