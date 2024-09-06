import React from 'react'
import styles from './Jobcard.module.scss'
export default function Jobcard() {
  return (
    <div className={styles.card}>
           <div className={styles.holder}>
              <div className={styles.head}>
                 <h1>Branch Manager</h1>
                 <h3>Addis Ababa</h3>
              </div>
              <div className={styles.line}> </div>
              <div className={styles.desc}>
                Branch manager needed for Addis Ababa gotera branch. Who can bring great value for the company with minimun 4+ exprience 
              </div>
              <div className={styles.buttons}>
                <button>View detail</button>
                <button>Apply Now</button>
              </div>
           </div>
    </div>
  )
}
