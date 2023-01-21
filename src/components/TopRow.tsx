import React, { useState, useEffect } from 'react';
import MetricBox from './MetricBox';
import { MetricCollection, Units } from '../../types/types';
import styles from './styles/Charts.module.scss';
import { GrAddCircle } from 'react-icons/gr';
interface topRowProps {
  metrics: MetricCollection[];
}
export default function TopRow({ metrics }: topRowProps) {
  
  const [metrixBoxArray, setMetrixBoxArray] = useState();
  
  return (
    <div className={styles.topRow}>
      <MetricBox
        boxData={metrics[metrics.length].connected_clients}
        name='Connected Clients'
        metric={'connected_clients'}
      />

      <MetricBox
        boxData={metrics[metrics.length].used_memory}
        name='Used Memory'
        metric={'used_memory'}
      />
      <button className={styles.addEndpoint} >
        <GrAddCircle size={30} color={'313614'} />
      </button>
    </div>   
  )

}
