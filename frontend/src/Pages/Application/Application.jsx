import React from 'react'

export default function Application() {
  return (
    <div className={styles.formContainer}>
    <h2>Complete your profile</h2>
    <form>
      {/* Personal Information */}
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className={`fas fa-user ${styles.customIcon}`}></i>
          <input type="text" placeholder="First Name" />
        </div>
        <div className={styles.inputField}>
          <i className={`fas fa-user ${styles.customIcon}`}></i>
          <input type="text" placeholder="Last Name" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className={`fas fa-envelope ${styles.customIcon}`}></i>
          <input type="email" placeholder="Email" />
        </div>
        <div className={styles.inputField}>
          <i className={`fas fa-phone ${styles.customIcon}`}></i>
          <input type="tel" placeholder="Phone Number" />
        </div>
      </div>

      {/* Education Section */}
      <h3>Appling For</h3>
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className={`fas fa-university ${styles.customIcon}`}></i>
          <input type="text" placeholder="Institution" />
        </div>
        <div className={styles.inputField}>
          <i className={`fas fa-graduation-cap ${styles.customIcon}`}></i>
          <input type="text" placeholder="Degree" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className={`fas fa-calender ${styles.customIcon}`}></i>
          <input type="date" placeholder="Start Date" />
        </div>
        <div className={styles.inputField}>
          <i className={`fas fa-calender ${styles.customIcon}`}></i>
          <input type="date" placeholder="End Date" />
        </div>
      </div>

      {/* Experience Section
      <h3>Work Experience</h3>
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className="fas fa-building"></i>
          <input type="text" placeholder="Company Name" />
        </div>
        <div className={styles.inputField}>
          <i className="fas fa-briefcase"></i>
          <input type="text" placeholder="Job Title" />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className="fas fa-calendar"></i>
          <input type="date" placeholder="Start Date" />
        </div>
        <div className={styles.inputField}>
          <i className="fas fa-calendar"></i>
          <input type="date" placeholder="End Date" />
        </div>
      </div> */}

      {/* Language Skills */}
      <h3>Language Skills</h3>
      <div className={styles.row}>
        <div className={styles.inputField}>
          <i className="fas fa-language"></i>
          <input type="text" placeholder="Language" />
        </div>
        <div className={styles.inputField}>
          <i className="fas fa-chart-bar"></i>
          <input type="text" placeholder="Proficiency (e.g., Fluent)" />
        </div>
      </div>

      {/* Submit */}
      <div className={styles.submitSection}>
        <input type="submit" value="Submit Application" className={styles.submitButton} />
      </div>
    </form>
  </div>
  )
}
