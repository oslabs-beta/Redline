export interface MetricCollection extends Metrics {
  //one instance of a metric

  used_memory: number; // macro
  // used_memory_rss: number; // allocated memory for redis
  used_memory_peak: number; // macro
  keyspace_hits: number; // macro => micro
  keyspace_misses: number; // macro => micro
  instantaneous_ops_per_sec: number; // micro
  total_commands_processed: number; // macro => micro
  connected_clients: number; // macro
  total_connections_received: number; // 
  instantaneous_input_kbps: number; // micro
  instantaneous_output_kbps: number; // micro
  total_net_input_bytes: number; // macro => micro
  total_net_output_bytes: number; // macro => micro
  evicted_keys: number; // macro => micro
  expired_keys: number; // macro => micro
  rejected_connections: number; // macro => micro
  uptime_in_seconds: number; // macro => micro
  //db0
  keys: number, // micro
  expires: number, // micro
  avg_ttl: number, // micro
  // custom data metrics
  used_memory_session: number; 
  keyspace_hits_session: number;
  keyspace_misses_session: number; 
  keyspace_hitratio_session: number; // calc from above 2, may return NaN
  total_net_input_bytes_session: number; 
  total_net_output_bytes_session: number; 
  total_commands_processed_session: number;
  evicted_keys_session: number; 
  expired_keys_session: number;
  rejected_connections_session: number;
  uptime_in_seconds_session: number;
}

export interface Metrics {
  [metricKey: string]: number;// | undefined;
}

export const Units: Units = {
  // stores keys to iterate when fetching data, also store unit to corresponding metricKey
  used_memory: 'bytes',
  // used_memory_rss: 'bytes',
  used_memory_peak: 'bytes',
  keyspace_hits: 'hits',
  keyspace_misses: 'misses',
  instantaneous_ops_per_sec: 'operations/sec',
  total_commands_processed: 'commands',
  connected_clients: 'clients',
  total_connections_received: 'cxns received',
  instantaneous_input_kbps: 'kb/s',
  instantaneous_output_kbps: 'kb/s',
  total_net_input_bytes: 'bytes',
  total_net_output_bytes: 'bytes',
  evicted_keys: 'keys',
  expired_keys: 'keys',
  rejected_connections: 'connections rejected',
  uptime_in_seconds: 'seconds',
  keys: 'keys',
  expires: 'expiring keys',
  avg_ttl: 'seconds',
  // calculated metrics
  used_memory_session: 'bytes',
  keyspace_hits_session: 'hits',
  keyspace_misses_session: 'misses', 
  keyspace_hitratio_session: 'hits/total', // calc from above 2
  total_net_input_bytes_session: 'bytes',
  total_net_output_bytes_session: 'bytes', 
  total_commands_processed_session: 'commands', 
  evicted_keys_session: 'keys',
  expired_keys_session: 'keys', 
  rejected_connections_session: 'connections rejected', 
  uptime_in_seconds_session: 'seconds'
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
