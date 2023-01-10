import React, { useState, useEffect } from 'react';
import Alert from './Alert';

interface boxProps {
  boxData: number;
  name: string;
}

export default function MetricBox({ name, boxData }: boxProps) {
  const metric: string = name;
  const unit: string = 'clients';
  const boxStyle = {
    backgroundColor: '#dee2e6',
    border: '3px solid #cb2e16',
    padding: '3vw',
    // display: 'flex',
    fontSize: '2vw',
    placeSelf: 'center',
    margin: 'auto',
  };
  return (
    <div>
      <h2>{name}</h2>
      <div style={{ display: 'flex', height: '19.5vw', width: '29vw' }}>
        <div style={{ ...boxStyle, display: boxData ? 'flex' : 'none' }}>
          <h1 style={{ margin: 'auto', alignSelf: 'center' }}>
            {boxData ? `${boxData} ${unit}` : ''}
          </h1>
        </div>
      </div>
      <Alert data={[boxData]} metric={metric} unit={unit} />
    </div>
  );
}
