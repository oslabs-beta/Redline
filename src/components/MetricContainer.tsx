import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineGraph from './LineGraph';


interface containerProps {
pieData: string,
lineData: number[]
}

export default function MetricContainer(props: containerProps): JSX.Element {

    return (
        <div>
            <PieChart pieData={props.pieData}/>
            <LineGraph />
            <BarChart />
        </div>
    )
}