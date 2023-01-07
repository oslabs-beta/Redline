import React, { useState } from 'react';
import AlertModal from './AlertModal';
import '../styles/modal.css';

type Props = {
  data: number[];
};

// pass in datapoints from chart/graph component to props
export default function Alert({ data }: Props) {
  // declare opened/close state, initialized to false to hide modal on default
  const [isOpened, setIsOpened] = useState(false);

  const onConfirm = () => {
    console.log('confirm clicked');
    // add window alerts logic here
    console.log('alert started');
    // use setTimeout to render a new alert for a specific metric every 2 minutes
    setTimeout(
      () => alert(`Current memory usage is ${data[data.length - 1]} bytes`),
      10000
    );

    // check if the last element in the data array is greater than the threshold
    // if so, send alert
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
        id="create-alert-button"
      >
        Create New Alert
      </button>
      <AlertModal
        title="Create an Alert"
        isOpened={isOpened}
        onConfirm={onConfirm}
        onClose={() => setIsOpened(false)}
      >
        Do you want to create a new alert?
      </AlertModal>
    </div>
  );
}
