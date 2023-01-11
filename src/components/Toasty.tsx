import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillBellFill } from 'react-icons/bs';
import AlertModal from './AlertModal';

type Props = {
  data: number[] | number[][];
  metric: string;
  unit: string;
};
export default function Push({ data, metric, unit }: Props) {
  // declare opened/close state, initialized to false to hide modal on default
  const [isOpened, setIsOpened] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('');
  const [number, setNumber] = useState<number | undefined>();

  const showToastMessage = () => {
    toast.info(
      `Current ${metric.toLowerCase()} is ${data[data.length - 1]} ${unit}`,
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );

    let sound = new Audio('https://www.myinstants.com/media/sounds/old-aol-instant-messenger-aim-sound-effects-youtube.mp3')
    sound.play(); 

  };

  useEffect(() => {
    if (isActivated) {
      console.log('is actived: ', isActivated);
      console.log('current num: ', data[data.length - 1], 'input param: :', number);
      // if greater than, check if the last element of the array is greater than the user submitted number param
      if (dropDownValue === 'greaterThan' && number !== undefined) {
        if (data[data.length - 1] > number) showToastMessage();
      }
      // if less than, check if the last element of the array is less than the user submitted number param
      else if (dropDownValue === 'lessThan' && number !== undefined) {
        if (data[data.length - 1] < number) showToastMessage();
      }
      setIsActivated(false);
    }
  }, [data]);

  const onConfirm = () => {
    setIsActivated(true);
  };

  return (
    <div>
      <div className='alert'>
        {/* create a button for the chart components */}
        <button
          className='alertButton'
          onClick={() => {
            console.log('create alert clicked');
            setIsOpened(true);
          }}
        >
          <BsFillBellFill size={20} />
        </button>
        <AlertModal
          title={`Create an Alert for ${metric}`}
          isOpened={isOpened}
          onConfirm={onConfirm}
          onClose={() => setIsOpened(false)}
          setDropDownValue={setDropDownValue}
          setNumber={setNumber}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
