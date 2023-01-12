import React, { useState, useEffect } from 'react';
import Alerts from './Alerts'; 

interface boxProps {
  boxData: number;
  name: string;
}

export default function MetricBox({ name, boxData }: boxProps) {
  const metric: string = name;
  const unit: string = 'clients';

  return (
    <div className='graphWrapper'>
      <h2>{name}</h2>
          <h1>
            {boxData ? `${boxData} ${unit}` : ''}
          </h1>
      <Alerts data={[boxData]} metric={metric} unit={unit}/>
    </div>
  );
}
