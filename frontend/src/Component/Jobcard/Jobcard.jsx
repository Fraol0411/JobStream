import React from 'react'
import {useState} from 'react'
import styles from './Jobcard.module.scss'
import JobDetailPopup from '../Jobdeatail/JobDetailPopup';
import { useNavigate } from 'react-router-dom';

export default function Jobcard({  
  id,
  title, 
  department, 
  dutystation, 
  description, 
  requirements, 
  jobtype, 
  status, 
  created_by, 
  salary, 
  qualification, 
  responsibilities, 
  deadline, 
  contact, 
  benefits }) {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const handleViewDetailClick = () => {
    setShowPopup(true); // Show the popup when button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when close is clicked
  };

  const hanldleNaviagtion = () =>{
    navigate('/application')
  }
  return (
    <div className={styles.card}>
           <div className={styles.holder}>
              <div className={styles.head}>
                 <h1>{title}</h1>
                 <h3>{dutystation}</h3>

              </div>
              
              <div className={styles.desc}>
               <p><strong>department: </strong>{department}</p> 
               {description}
              </div>
              <div className={styles.buttons}>
                <button onClick={handleViewDetailClick} >View detail</button>
                {/* <button onClick={hanldleNaviagtion}>Apply Now</button> */}
              </div>
           </div>

           {showPopup && (
              <JobDetailPopup
              job={{   
                id,
                title, 
                department, 
                dutystation, 
                description, 
                requirements, 
                jobtype, 
                status, 
                created_by, 
                salary, 
                qualification, 
                responsibilities, 
                deadline, 
                contact, 
                benefits }} // Passing the job object
               onClose={handleClosePopup}
                />
      )}
    </div>
  )
}
