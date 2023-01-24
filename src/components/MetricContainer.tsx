import React, { useState, useEffect } from 'react';
import MetricBox from './MetricBox';
import { MetricCollection, Units } from '../../types/types';
import { SymbolDisplayPartKind } from 'typescript';
import ScatterChart from './ScatterChart';
import DynamicLineGraph from './DynamicLineGraph';
import styles from './styles/Charts.module.scss';
import { GrAddCircle } from 'react-icons/gr';

interface containerProps {
  metrics: MetricCollection[];
}

export default function MetricContainer(props: containerProps): JSX.Element {
  const { metrics } = props;
  const lastMetric = metrics[metrics.length - 1];
  const {
    used_memory,
    used_memory_dataset,
    used_memory_startup,
    keyspace_hits,
    keyspace_misses,
    connected_clients,
  } = lastMetric || {};
  return (
    <div className={styles.metricContainer}>
      <div className={styles.topRow}>
          <MetricBox
            boxData={connected_clients}
            name='Connected Clients'
            metric={'connected_clients'}
          />
          <MetricBox
            boxData={used_memory}
            name='Used Memory'
            metric={'used_memory'}
          />
          <button className={styles.addEndpoint} >
            <GrAddCircle size={30} color={'313614'} />
          </button>
      </div>
      <div className={styles.graphContainer}>
        <ScatterChart metrics={metrics} />
        <ScatterChart metrics={metrics} />
        <DynamicLineGraph metrics={metrics} />
        <DynamicLineGraph metrics={metrics} />
      </div>
    </div>
  );
}
