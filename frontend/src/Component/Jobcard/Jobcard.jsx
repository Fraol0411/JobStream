import React from 'react'
import {useState} from 'react'
import styles from './Jobcard.module.scss'
import JobDetailPopup from '../Jobdeatail/JobDetailPopup';

export default function Jobcard({ title, location, description }) {

  const [showPopup, setShowPopup] = useState(false);

  const handleViewDetailClick = () => {
    setShowPopup(true); // Show the popup when button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when close is clicked
  };

  return (
    <div className={styles.card}>
           <div className={styles.holder}>
              <div className={styles.head}>
                 <h1>{title}</h1>
                 <h3>{location}</h3>
              </div>
              <div className={styles.line}> </div>
              <div className={styles.desc}>
               {description}
              </div>
              <div className={styles.buttons}>
                <button onClick={handleViewDetailClick} >View detail</button>
                <button>Apply Now</button>
              </div>
           </div>

           {showPopup && (
              <JobDetailPopup
              job={{ title, location, description }} // Passing the job object
               onClose={handleClosePopup}
                />
      )}
    </div>
  )
}
