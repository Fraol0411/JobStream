import React from 'react';
import styles from './Succespop.module.scss'; // You can style it
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Succespop({ onClose }) {
  return (
    <div className={styles.popupSuccess}>
      <div className={styles.Succes}>
          <p> You have Succefully submitted application to this job </p>
          <i className="fas fa-check"></i>
      </div>
    </div>
  );
}
