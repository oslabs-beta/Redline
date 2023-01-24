import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillBellFill } from 'react-icons/bs';
import AlertModal from './AlertModal';
import styles from './styles/Modal.module.scss';

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
  const [bellColor, setBellColor] = useState('313641');

  const showToastMessage = () => {
    toast.info(
      `Current ${metric.toLowerCase()} is ${data[data.length - 1]} ${unit}`,
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );

    let sound = new Audio(
      'https://www.myinstants.com/media/sounds/old-aol-instant-messenger-aim-sound-effects-youtube.mp3'
    );
    sound.play();
  };

  const humanMetric = () => {
    let result = metric.split('_');
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(' ');
  };

  useEffect(() => {
    if (isActivated) {
      // if greater than, check if the last element of the array is greater than the user submitted number param
      if (dropDownValue === 'greaterThan' && number !== undefined) {
        if (data[data.length - 1] > number) {
          showToastMessage();
          onDeactivate();
        }
      }
      // if less than, check if the last element of the array is less than the user submitted number param
      else if (dropDownValue === 'lessThan' && number !== undefined) {
        if (data[data.length - 1] < number) {
          showToastMessage();
          onDeactivate();
        }
      }
    }
  }, [data]);

  const onConfirm = () => {
    console.log('alert activated/confirmed');
    setIsActivated(true);
    console.log('isActivated is ', isActivated);
    setBellColor('CB3016');
  };

  const onDeactivate = () => {
    setIsActivated(false);
    setBellColor('313641');
    setNumber(undefined);
    setDropDownValue('');
    console.log('deactivated message is', deactivateMessage);
  };

  let deactivateMessage = dropDownValue
    ? `Active alert: ${humanMetric()} to ${
        dropDownValue === 'greaterThan' ? 'exceed' : 'fall below'
      } ${number} ${unit}.`
    : `No active alert.`;

  // const deactivateMessageHelper = () => {
  //   if (dropDownValue === 'greaterThan') {
  //     return (deactivateMessage = `Active alert: ${metric} exceed ${number} ${unit}.`);
  //   }
  //   if (dropDownValue === 'lessThan') {
  //     return (deactivateMessage = `Active alert: ${metric} fall below ${number} ${unit}.`);
  //   }
  //   return (deactivateMessage = `No alert created.`);
  // };

  return (
    <div className={styles.alertWrapper}>
      <div className={styles.alert}>
        <button
          className={styles.alertButton}
          onClick={() => {
            console.log('isActivated is ', isActivated);
            setIsOpened(true);
          }}
        >
          <BsFillBellFill size={20} color={bellColor} />
        </button>
        <AlertModal
          title={`Create an Alert for ${humanMetric()}`}
          deactivateTitle={`Turn Off Alert for ${humanMetric()}`}
          deactivateMessage={deactivateMessage}
          isOpened={isOpened}
          onConfirm={onConfirm}
          onClose={() => setIsOpened(false)}
          setDropDownValue={setDropDownValue}
          setNumber={setNumber}
          unit={unit}
          onDeactivate={onDeactivate}
          isActivated={isActivated}
          dropDownValue={dropDownValue}
          number={number}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
