import React, { useState, useEffect } from 'react';
import Alerts from './Alerts';
import styles from './styles/MetricBox.module.scss';
import { MetricCollection, Units } from '../../types/types';
import DropDown from './DropDown';
import { BsTrash } from 'react-icons/bs';

interface boxProps {
  deleteFn: Function;
  metrics: MetricCollection;
  id: string;
}

export default function DynamicMetricBox({ metrics, deleteFn, id }: boxProps) {
  const [currMetric, setCurrMetrics] = useState<string>('')

  return (
    <div className={styles.graphWrapper}>
      <DropDown setStateFn={setCurrMetrics} axisState={currMetric} category={'a metric'}/>
      <h1>{ (metrics && currMetric != '') ? `${metrics[currMetric]} ${Units[currMetric]}` : ''}</h1>
      <div className={styles.buttonDiv}>
        <Alerts data={metrics ? [metrics[currMetric]] : [NaN]} 
          metric={currMetric} 
          unit={Units[currMetric]} 
        />   
        <button className={styles.addEndpoint} onClick={() => deleteFn(id)}>
          <BsTrash size={20} color={'313614'} />
        </button>
      </div>
    </div>
  );
}
