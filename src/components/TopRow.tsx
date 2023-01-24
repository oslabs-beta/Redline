import React, { useState, useEffect, ReactEventHandler, use } from 'react';
import { MetricCollection, Units } from '../../types/types';
import styles from './styles/TopRow.module.scss';
import { GrAddCircle } from 'react-icons/gr';
import DynamicMetricBox from './DynamicMetricBox';
import uniqid from 'uniqid';

interface topRowProps {
  metrics: MetricCollection;
}
export default function TopRow({ metrics }: topRowProps) {
  
  const [metricBoxArray, setMetricBoxArray] = useState<string[]>([]); //<JSX.Element[]>([]);

  const handleDelete = (delId: string): void => {
    setMetricBoxArray(metricBoxArray.filter((id) => {
      return id !== delId
    }))
  }

  const handleAdd = (e: React.MouseEvent): void => {
    const myId = uniqid();
    setMetricBoxArray([...metricBoxArray, myId]);
  }

  useEffect(() => { // start with one metric box
    const myId = uniqid();
    setMetricBoxArray([...metricBoxArray, myId]);
  }, [])

  return (
    <div className={styles.topRow}>
      { metricBoxArray.map((id, ind) => {
        return (
          <DynamicMetricBox metrics={metrics} deleteFn={handleDelete} key={id} id={id} />
        )
      }) }
  
      <button className={styles.addBox} onClick={ (e: React.MouseEvent) => handleAdd(e) }>
        <GrAddCircle size={30} color={'313614'} />
      </button>
    </div>   
  )

}
