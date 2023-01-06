import { useState, useEffect, useRef } from 'react';

type Props = {
  isOpened: boolean,
  onConfirm: () => void,
  onClose: () => void,
}

export default function AlertModal (props:Props) {

  if (!props.isOpened) return null;

  // declare onClick handler function that confirms the alert notification and closes the modal
function onClickHandler () {
  props.onConfirm();
  props.onClose();
 }

 const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={preventAutoClose}>Do you want to create a new alert?
      <p>Click confirm to create alert</p>
      <button onClick={onClickHandler}>Confirm</button>
      <button onClick={props.onClose}>Cancel</button>
    </div>

  )
}

