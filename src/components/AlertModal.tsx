import React, { useState } from 'react';

type Props = {
  title: string;
  isOpened: boolean;
  onConfirm: () => void;
  onClose: () => void;
  // children: React.ReactNode;
  setDropDownValue: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<number|undefined>>;
};

export default function AlertModal({
  title,
  isOpened,
  onConfirm,
  onClose,
  // children,
  setDropDownValue,
  setNumber
}: Props) {

  // if isOpened is false, modal is closed and should return nothing
  if (!isOpened) return null;

  // declare onClick handler function that confirms the alert notification and closes the modal
  function confirmAndClose() {
    
    onConfirm();
    onClose();
    // add logic to set the state for Toast notification to activated
  }

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className='modalOverlay' onClick={onClose}>
      <div className='modal' onClick={preventAutoClose}>
        <h3>{title}</h3>
        <div className='modalContent'>
          <form>
            <select
              onChange={(event) => setDropDownValue(event.target.value)}
              className='dropdown'
              name=''
              id=''
            >
              <option value='null'>Select:</option>
              <option value='lessThan'>Falls below</option>
              <option value='greaterThan'>Exceeds</option>
            </select>
            <br />
            <br />
            <input
             defaultValue = '0'
            type='number'
            onChange={(event) => setNumber(+event.target.value)} />
            <br />
            <br />
            <button
              className='togglebutton'
              type='submit'
              onClick={confirmAndClose}
            >
              Confirm
            </button>
            <button className='togglebutton' onClick={onClose}>
              Cancel
            </button>
          </form>
          {/* {children} */}

          <br />
        </div>
      </div>
    </div>
  );
}
