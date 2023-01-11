import React, { useState, useEffect } from 'react';
import Toasty from './Toasty'; 

interface boxProps {
  boxData: number;
  name: string;
}

export default function MetricBox({ name, boxData }: boxProps) {
  const metric: string = name;
  const unit: string = 'clients';

  return (
    <div className='graphContainer'>
      <h2>{name}</h2>
          <h1>
            {boxData ? `${boxData} ${unit}` : ''}
          </h1>
      <Toasty data={[boxData]} metric={metric} unit={unit}/>
    </div>
  );
}
