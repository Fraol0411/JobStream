import React from 'react';
import styles from './Succespop.module.scss'; // You can style it

export default function Succespop({ onClose }) {
  return (
    <div className={styles.popupBackdrop}>
      <div className={styles.popup}>
        <h2>Job Details</h2>
        <p>Here are the full details for the Branch Manager position in Addis Ababa. With this setup, you should have a working modal that pops up when a user clicks the "View Job Detail" button on a job card. Would you like to tweak or enhance any part of it?</p>
        <p>job grade: IV</p>
        <p>Salary: atractive</p>
        <p>work location : Diredawa</p>
        <p>type : Fulltime</p>
        <textarea name="" id="">
            requirments:
            
        </textarea>
        <button onClick={onClose}>Close</button>
        <button onClick={onClose}>Apply now</button>
      </div>
    </div>
  );
}
