import React from 'react';
import styles from './Succespop.module.scss'; // You can style it
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Succespop({ onClose }) {
  return (
    <div className={styles.popupSuccess}>
      <div className={styles.Succes}>
        {/* Close Icon with new styling */}
        <i className={`${styles.closeIcon} fas fa-xmark`} onClick={onClose}></i>
        <p>You have successfully submitted the application for this job</p>
        <i className={`${styles.check} fas fa-check`} ></i>
      </div>
    </div>
  );
}
