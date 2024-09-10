import React from 'react';
import styles from './JobDetailPopup.module.scss'; // Ensure you style this appropriately

export default function JobDetailPopup({ job, onClose }) {
  console.log(job)
  return (
    <div className={styles.popupBackdrop}>
      <div className={styles.popup}>
        <h2>{job.title}</h2>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Job Description:</strong> {job.description}</p>
        <p><strong>Company Overview:</strong> A brief description of the company here.</p>
        <p><strong>Salary Range:</strong> Attractive salary based on experience.</p>
        <p><strong>Job Type:</strong> Full-time</p>
        <p><strong>Experience Required:</strong> Minimum 4 years.</p>
        <p><strong>Qualifications:</strong> Relevant qualifications required.</p>
        <p><strong>Responsibilities:</strong> Key tasks and duties of the role.</p>
        <p><strong>Skills Required:</strong> Leadership, management skills, etc.</p>
        <p><strong>Application Deadline:</strong> Date if applicable.</p>
        <p><strong>Benefits:</strong> Health insurance, bonuses, etc.</p>
        <p><strong>How to Apply:</strong> Apply by sending your CV to [email@example.com].</p>
        <p><strong>Contact Information:</strong> For more information, contact [Contact Person] at [phone/email].</p>
        <button onClick={onClose}>Close</button>
        <button onClick={onClose}>Apply Now</button>
      </div>
    </div>
  );
}
