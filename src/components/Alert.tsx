import React, { useState } from 'react';
import AlertModal from './AlertModal';
import { BsFillBellFill } from 'react-icons/bs'

type Props = {
  data: number[] | number[][];
  metric: string;
  unit: string;
};

// pass in datapoints from chart/graph component to props
export default function Alert({ data, metric, unit }: Props) {
  // declare opened/close state, initialized to false to hide modal on default
  const [isOpened, setIsOpened] = useState(false);

  const onConfirm = () => {
    console.log('confirm clicked');
    // add window alerts logic here
    console.log('alert started');
    // use setTimeout to render a new alert for a specific metric every 2 minutes
    setTimeout(
      () => alert(`Current ${metric.toLowerCase()} is ${data[data.length - 1]} ${unit}`),
      10000
    );

    // check if the last element in the data array is greater than the threshold. if so, send alert
  };

  // return a div that contains the hidden modal and button to show the modal
  return (
    <div className="alert">
      {/* create a button for the chart components */}
      <button
        className="alertButton"
        onClick={() => {
          console.log('create alert clicked');
          setIsOpened(true);
        }}
      >
        <BsFillBellFill size={20} />
      </button>
      <AlertModal
        title= {`Create an Alert for ${metric}`}
        isOpened={isOpened}
        onConfirm={onConfirm}
        onClose={() => setIsOpened(false)}
      >
        Do you want to create a new alert?
      </AlertModal>
    </div>
  );
}

/*

comments to be removed before finalizing dev app
[X] window alerts that spin up every 15 seconds
[] window alerts that display correct titles and measurements for each visualizers/graphs we selected for MVP
[] converting window alerts to email notifications
[] alerts that accepts parameters/thresholds and alert users via email notification 
[] push notifications 
*/