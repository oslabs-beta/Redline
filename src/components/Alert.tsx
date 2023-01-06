import React, { useState } from 'react';
import AlertModal from './AlertModal';

// pass in datapoints from chart/graph component to props
export default function Alert () {
    // declare opened/close state, initialized to false to hide modal on default
    const [isOpened, setIsOpened] = useState(false);


    const onConfirm = () => {
        console.log("confirm clicked");
        // add window alerts logic here
        console.log('alert started')
        // use setTimeout to render a new alert for a specific metric every 2 minutes
        setTimeout(() => alert(`this is an alert`), 120000)
    };


    // return a div that contains the hidden modal and button to show the modal
    return (
        <div className='alert'>
            {/* create a button for the chart components */}
            <button onClick={() => setIsOpened(true)} className='alertButton'>Create New Alert</button>
            <AlertModal
            isOpened = {isOpened}
            onConfirm = {onConfirm}
            onClose={() => setIsOpened(false)}
            ></AlertModal>
        </div>

    )
}