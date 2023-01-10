import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineGraph from './LineGraph';
import MetricBox from './MetricBox';
import { MetricCollection, Units } from '../../types/types';

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
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `'line bar' 'pie pie'`,
        gridTemplateColumns: '1fr 1fr',
        marginLeft: '5vw',
      }}
    >
      <div style={{ gridTemplateAreas: 'line', width: '30vw' }}>
        <LineGraph
          lineData={metrics.map((metric) => metric.used_memory)}
          title={'Memory Usage Over Time'}
          axesLabels={['Elapsed time (seconds)', 'Bytes']}
        />
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
      <div style={{ gridTemplateAreas: 'pie', width: '20vw' }}>
        <MetricBox boxData={connected_clients} name='Connected Clients' />
        {/* <PieChart
          pieData={usedMem ? [usedMem, 100 - usedMem] : [0]}
          name='Memory Usage'
          labels={['Memory Used', 'Memory Available']}
        /> */}
      </div>
      <div style={{ gridTemplateAreas: 'pie', width: '20vw' }}>
        <PieChart
          pieData={hitRate ? [hitRate, 100 - hitRate] : [0]}
          name='Hit Rate'
          labels={['Hits', 'Misses']}
        />
      </div>
    </div>
  );
}
