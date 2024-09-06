import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from'./Joblist.module.scss'
import Jobcard from '../../Component/Jobcard/Jobcard';
export default function Joblist() {
  return (
    <div className={styles.joblist}>
      <div className={styles.containerrr}>
        <div className={styles.headerarea}>

          <div className={styles.filterarea}>
             
                  <div className={styles.filterby}>
                      <div className={styles.typedrop}>
                        <span>sortby: </span>
                        <div className={styles.selectdropdown}>
                          <select name="" id="">
                            <option value="">All</option>
                            <option value="">Full-Time</option>
                            <option value="">Part-Time</option>
                            <option value="">Contrat</option> 
                          </select>
                        </div>
                      </div>

                      <div className={styles.typedrop}>
                        <span>Level: </span>
                        <div className={styles.selectdropdown}>
                          <select name="" id="">
                            <option value="">All</option>
                            <option value="">Senior</option>
                            <option value="">Joniur</option>
                            <option value="">Contrat</option>
                          </select>
                        </div>
                      
                      </div>

                      <div className={styles.typedrop}>
                        <span>Role: </span>
                        <div className={styles.selectdropdown}>
                          <select name="" id="">
                            <option value="">All</option>
                            <option value="">Manager</option>
                            <option value="">Underwriter</option>
                            <option value="">information technology</option>
                          </select>                          
                        </div>

                      </div>

                      <div className={styles.filterbtn}>
                        <button>Search</button>
                      </div>
                 
                </div>
          </div>
        </div>

        <div className={styles.jobcards}>
          <div className={styles.cardholder}>
                <Jobcard/>
                <Jobcard/>
                <Jobcard/>
                <Jobcard/>
                <Jobcard/>
                <Jobcard/>
                <Jobcard/>
                <Jobcard/>      
          </div>
        </div>
        
      </div>
    </div>
  )
}
