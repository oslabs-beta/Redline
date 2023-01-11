import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineGraph from './LineGraph';
import MetricBox from './MetricBox';
import { MetricCollection, Units } from '../../types/types';
import { SymbolDisplayPartKind } from 'typescript';

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
  // console.log(metrics);
  let usedMem;
  let hitRate;
  if (lastMetric) {
    // console.log(pieMetric);
    usedMem = used_memory / (used_memory_dataset - used_memory_startup);
    hitRate = keyspace_hits / (keyspace_hits + keyspace_misses);
  }
  return (
    <div className='chartContainer'>
      <div>
        <LineGraph
          lineData={metrics.map((metric) => metric.used_memory)}
          title={'Memory Usage Over Time'}
          axesLabels={['Elapsed time (seconds)', 'Bytes']}
        />
      </div>
      <div>
        {/* <BarChart
          barData={metrics.map((metric) => [
            metric.used_memory,
            metric.used_memory_rss - metric.used_memory,
          ])}
          name='Memory Usage'
          labels={['Memory Used', 'Memory Available']}
        /> */}
          <LineGraph
          lineData={metrics.map((metric) => metric.instantaneous_ops_per_sec)}
          title={'Operations Per Second'}
          axesLabels={['Elapsed time (seconds)', 'Bytes']}
        />
      </div>
      <div>
        <MetricBox boxData={connected_clients} name='Connected Clients' />
        {/* <PieChart
          pieData={usedMem ? [usedMem, 100 - usedMem] : [0]}
          name='Memory Usage'
          labels={['Memory Used', 'Memory Available']}
        /> */}
      </div>
      <div>
        <PieChart
          pieData={keyspace_hits ? [keyspace_hits, keyspace_misses] : [0]}
          name='Hit Rate'
          labels={['Hits', 'Misses']}
        />
      </div>
    </div>
  );
}
