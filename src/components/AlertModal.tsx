import { ElectricScooterOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import styles from './styles/Modal.module.scss';

type Props = {
  title: string;
  deactivateTitle: string;
  deactivateMessage: string;
  isOpened: boolean;
  onConfirm: () => void;
  onClose: () => void;
  setDropDownValue: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
  unit: string;
  onDeactivate: () => void;
  isActivated: boolean;
  dropDownValue: string;
};

export default function AlertModal({
  title,
  deactivateTitle,
  deactivateMessage,
  isOpened,
  onConfirm,
  onClose,
  setDropDownValue,
  setNumber,
  onDeactivate,
  isActivated,
  unit,
  dropDownValue,
}: Props) {
  const [warningMessage, setWarningMessage] = useState('');

  // if isOpened is false, modal is closed and should return nothing
  if (!isOpened) return null;

  // onClick handler function that confirms the alert notification and closes the modal
  function confirmAndClose() {
    if (dropDownValue === '') {
      setWarningMessage('Please select an option from the drop down menu.');
    } else {
      setWarningMessage('');
      onConfirm();
      onClose();
    }
  }

  function deactivateAndClose() {
    onDeactivate();
    onClose();
  }

  function onCancel() {
    setWarningMessage('');
    onClose();
  }

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  if (isActivated) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={preventAutoClose}>
          <h3>{deactivateTitle}</h3>
          <div className={styles.modalContent}>
            <div>{deactivateMessage}</div>
            <br />
            <br />
            <button
              className={styles.togglebutton}
              type="submit"
              onClick={deactivateAndClose}
            >
              Confirm
            </button>
            <button className={styles.togglebutton} onClick={onCancel}>
              Cancel
            </button>
            <br />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={preventAutoClose}>
        <h3>{title}</h3>
        <div className={styles.modalContent}>
          <form>
            <select
              onChange={(event) => setDropDownValue(event.target.value)}
              className={styles.dropdown}
              name=""
              id=""
              required
            >
              <option value="">Select:</option>
              <option value="lessThan">Fall below</option>
              <option value="greaterThan">Exceed</option>
            </select>
            <br />
            <br />
            <input
              defaultValue="0"
              type="number"
              name="unit"
              onChange={(event) => setNumber(+event.target.value)}
            />
            <label htmlFor="unit"> {unit}</label>
            <br />
            {warningMessage ? (
              <div style={{ color: 'red' }}>{warningMessage}</div>
            ) : (
              <br />
            )}
            <button
              className={styles.togglebutton}
              type="submit"
              onClick={confirmAndClose}
            >
              Confirm
            </button>
            <button className={styles.togglebutton} onClick={onCancel}>
              Cancel
            </button>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
