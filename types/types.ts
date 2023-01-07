export interface MetricCollection {
  //one instance of a metric

  used_memory: number; // current used memory
  used_memory_rss: number; // allocated memory for redis
  used_memory_peak: number; // peak memory used
  total_system_memory: number; //total cpu memory
  used_memory_dataset: number; // number in bytes
  used_memory_startup: number;
  keyspace_hits: number;
  keyspace_misses: number;
}

export interface Metrics {
  [metricKey: string]: number;
}

export const Units: Units = {
  // stores keys to iterate when fetching data, also store unit to corresponding metricKey
  used_memory: 'bytes',
  used_memory_rss: 'bytes',
  used_memory_peak: 'bytes',
  total_system_memory: 'bytes',
  used_memory_dataset: 'bytes',
  used_memory_startup: 'bytes',
  keyspace_hits: 'hits',
  keyspace_misses: 'misses',
};

interface Units {
  [x: string]: string;
}
