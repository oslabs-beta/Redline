import { useState, useEffect, useRef } from 'react';

type Props = {
  title: string;
  isOpened: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

export default function AlertModal({
  title,
  isOpened,
  onConfirm,
  onClose,
  children,
}: Props) {
  // if isOpened is false, modal is closed and should return nothing
  if (!isOpened) return null;

  // declare onClick handler function that confirms the alert notification and closes the modal
  function confirmAndClose() {
    onConfirm();
    onClose();
  }

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="modal" onClick={preventAutoClose}>
      <h3>{title}</h3>
      <div className="modalContent">{children}</div>
      <div className="actions">
        <button className="togglebutton" onClick={confirmAndClose}>
          Confirm
        </button>
        <button className="togglebutton" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
