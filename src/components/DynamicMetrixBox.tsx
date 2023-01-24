import React, { useState, useEffect } from 'react';
import Alerts from './Alerts';
import styles from './styles/MetricBox.module.scss';
import { Units } from '../../types/types';
import DropDown from './DropDown';

interface boxProps {
  boxData: number;
  name: string;
  metric: string;
}

export default function MetricBox({ name, boxData, metric }: boxProps) {
  const title: string = name;
  const unit: string = Units[metric];
  const [currMetric, setCurrMetrics] = useState('')

  return (
    <div className={styles.graphWrapper}>
      {/* <h2>{name}</h2> */}
      <DropDown setStateFn={setCurrMetrics} axisState={currMetric} axis={'metric'}/>
      <h1>{boxData ? `${boxData} ${unit}` : ''}</h1>
      <Alerts data={[boxData]} metric={title} unit={unit} />
    </div>
  );
}
