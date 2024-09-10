import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './Profileset.module.scss'; // Ensure you have this CSS file

const Profileset = () => {
  return (
    <div className={styles.formContainer}>
      <h2>Complete your profile</h2>
      <form>
          <div className={styles.row1}>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.customIcon}`}></i>
              <input type="text" placeholder="First Name" />
            </div>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.customIcon}`}></i>
              <input type="text" placeholder="Middle Name" />
            </div>               
          </div> 

          <div className={styles.row2}>
             <h3>Apply For</h3>
             <div className={styles.dropdown}>
                <select name="" id="">
                  <option value="">Fresh Graduate</option>
                  <option value="">Extrnal Exprience</option>
                  <option value="">Awash Staff</option>
                </select>
             </div>
          </div> 

          <div className={styles.cgpa}>
            <div className={styles.inputField}>
              <i className={`fas fa-user ${styles.customIcon}`}></i>
              <input type="text" placeholder="enter Your CGPA" />
            </div>
          </div>  

          <div className={styles.button}>
              <button>Submit</button>
          </div>   
 
      </form>
    </div>
  );
};

export default Profileset;
