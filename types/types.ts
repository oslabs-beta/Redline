export interface MetricCollection extends Metrics {
  //one instance of a metric

  used_memory: number; // current used memory
  used_memory_rss: number; // allocated memory for redis
  used_memory_peak: number; // peak memory used
  total_system_memory: number; //total cpu memory
  used_memory_dataset: number; // number in bytes
  used_memory_startup: number;
  keyspace_hits: number;
  keyspace_misses: number;
  instantaneous_ops_per_sec: number;
  connected_clients: number;
  total_connections_received: number;
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
  instantaneous_ops_per_sec: 'operations/sec',
  connected_clients: 'clients',
  total_connections_received: 'cxns received'
};

interface Units {
  [x: string]: string;
}

export interface Endpoint {
  host: string,
  port: number,
  password: string,
  nickname: string
}

export interface ServerError {
  log?: string,
  message?: { err: string }
}
