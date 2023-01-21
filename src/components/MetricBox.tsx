import React, { useState, useEffect } from 'react';
import Alerts from './Alerts';
import styles from './styles/Charts.module.scss';
import { Units } from '../../types/types';

interface boxProps {
  boxData: number;
  name: string;
  metric: string;
}

export default function MetricBox({ name, boxData, metric }: boxProps) {
  const title: string = name;
  const unit: string = Units[metric];

  return (
    <div className={styles.graphWrapper}>
      <h2>{name}</h2>
      <h1>{boxData ? `${boxData} ${unit}` : ''}</h1>
      <Alerts data={[boxData]} metric={title} unit={unit} />
    </div>
  );
}
