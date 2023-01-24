import React, { useState, useEffect } from 'react';
import { MetricCollection, Units } from '../../types/types';
import ScatterChart from './ScatterChart';
import DynamicLineGraph from './DynamicLineGraph';
import styles from './styles/Charts.module.scss';
import TopRow from './TopRow';

interface containerProps {
  metrics: MetricCollection[];
}

export default function MetricContainer({ metrics }: containerProps): JSX.Element {

  return (
    <div className={styles.metricContainer}>
      <TopRow metrics={metrics[metrics.length - 1]}/>

      <div className={styles.graphContainer}>
        <ScatterChart metrics={metrics} />
        <ScatterChart metrics={metrics} />
        <DynamicLineGraph metrics={metrics} />
        <DynamicLineGraph metrics={metrics} />
      </div>
    </div>
  );
}
