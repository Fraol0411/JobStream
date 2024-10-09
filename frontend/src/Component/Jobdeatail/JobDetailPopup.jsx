import React from 'react';
import styles from './JobDetailPopup.module.scss'; // Ensure you style this appropriately
import { useNavigate } from 'react-router-dom';
export default function JobDetailPopup({ job, onClose }) {

   const navigate = useNavigate()

   const handleNavigation = () => {
    // Navigate to application form with the job.id passed as a parameter
    navigate(`/application/${job.id}`);
  };
console.log(job.id)
  return (
    <div className={styles.popupBackdrop}>
      <div className={styles.popup}>
        <h2>{job.title}</h2>
        <p><strong>Location:</strong> {job.dutystation}</p>
        <p><strong>Job Description:</strong> {job.description}</p>
        <p><strong>Requirments:</strong> {job.requirements}</p>
        <p><strong>Salary Range:</strong> {job.salary}</p>
        <p><strong>Job Type:</strong> {job.jobtype}</p>
        <p><strong>Qualifications:</strong> {job.qualification}</p>
        <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
        <p><strong>Application Deadline:</strong> {job.deadline}</p>
        <p><strong>Benefits:</strong> {job.benefits}</p>
        <p><strong>Contact Information:</strong> {job.contact}</p>
        <p><strong>Status</strong> {job.status}</p>
        <button onClick={onClose}>Close</button>
        <button onClick={() => { onClose(); handleNavigation(); }}>
           Apply Now
        </button>
      </div>
    </div>
  );
}
