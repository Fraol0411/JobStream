import React from 'react'
import styles from './Featureddiv.module.scss';
export default function Featureddiv() {
  return (
    <div className={styles.featured}>
    <div className={styles.container}>
      <div className={styles.featuredcomp}>
        <div className={styles.eachcomp}>
          <div className={styles.upper}>
            <h3>FullTime</h3>
            <h3>Jimma</h3>
          </div>
          <div className={styles.aboutjob}>
            <h3><span>Job Title:</span> Branch Manager</h3>
            <h3><span>Job Grade:</span> IV</h3>
            <h3><span>Deadline:</span> 24/Aug/2024</h3>
          </div>
          <div className={styles.apply}>
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
