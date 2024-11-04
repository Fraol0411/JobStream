// Profile.js
import React from "react";
import styles from "./Profile.module.scss"; // CSS module for styling

const Profile = () => {
  const appliedJobs = [
    {
      title: "Frontend Developer",
      applicationDate: "2024-09-01",
      status: "Pending",
    },
    {
      title: "Backend Engineer",
      applicationDate: "2024-08-25",
      status: "Approved",
    },
    {
      title: "Full Stack Developer",
      applicationDate: "2024-08-20",
      status: "Rejected",
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <h1>Your Applied Jobs</h1>
      <div className={styles.jobList}>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job, index) => (
            <div key={index} className={styles.jobCard}>
              <p>not availbale page right now</p>
            </div>
          ))
        ) : (
          <p>You have not applied to any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
