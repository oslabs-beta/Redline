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
  selectedMetric?: string;
};
export default function Push({ data, metric, unit, selectedMetric }: Props) {
  // declare opened/close state, initialized to false to hide modal on default
  const [isOpened, setIsOpened] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('lessThan');
  const [number, setNumber] = useState<number | undefined>(0);
  const [bellColor, setBellColor] = useState('313641');

  const getLastValue = (data: number[] | number[][]): number | undefined => {
    if (Array.isArray(data) && data.length > 0) {
      const lastElement = data[data.length - 1];
      if (Array.isArray(lastElement)) {
        return lastElement[lastElement.length - 1];
      } else {
        return lastElement;
      }
    }
    return undefined;
  };

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

  const humanMetric = metric
    .split('_')
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join(' ');

  const formattedSelectedMetric =
    selectedMetric &&
    selectedMetric
      .split('_')
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(' ');

  useEffect(() => {
    if (isActivated) {
      // if greater than, check if the last element of the array is greater than the user submitted number param
      const lastValue = getLastValue(data);
      if (lastValue !== undefined && number !== undefined) {
        if (dropDownValue === 'greaterThan') {
          if (lastValue > number) {
            showToastMessage();
            onDeactivate();
          }
        }
        // if less than, check if the last element of the array is less than the user submitted number param
        else if (dropDownValue === 'lessThan') {
          if (lastValue < number) {
            showToastMessage();
            onDeactivate();
          }
        }
      }
    }
  }, [data]);

  console.log('humanMetric is: ', humanMetric);
  console.log('dropdown Value is: ', dropDownValue);
  console.log('metric is: ', metric);

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
    ? `Active alert: ${
        humanMetric ? humanMetric : formattedSelectedMetric
      } to ${
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
          title={`Create an Alert for ${
            humanMetric ? humanMetric : formattedSelectedMetric
          }`}
          deactivateTitle={`Turn Off Alert for ${
            humanMetric ? humanMetric : formattedSelectedMetric
          }`}
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
        />
      </div>
      <ToastContainer />
    </div>
  );
}
