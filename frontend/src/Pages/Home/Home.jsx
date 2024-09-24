import React from 'react'
import styles from './Home.module.scss';
import Featuredcard from '../../Component/Featuredcard/Featuredcard'
import Vacancytype from '../../Component/Vacancytype/Vacancytype'
import Footer from '../../Component/Footer/Footer'
export default function Landing() {
  return (
    <div  className={styles.landing}>

     <div className={styles.Hero}>
          <div className={styles.landingholder}>
              <div className={styles.description}>
                  <h1>Join The Leading Insurance Company</h1>
                  <img src="/images/interview.png" alt="" />
                  <button className={styles.btngs}>Get Started</button>
              </div>
              <div className={styles.imageside}>
                  <div className={styles.circle}>
                    <h1>We Flow With You</h1>
                  </div>
                  <div className={styles.buildingimg}>
                    <img src="/images/womenlogo.png" alt="" />
                  </div>
              </div>
            </div>
            {/* <div className="inputfield">
              <input type="text" placeholder='search for jobs'/>
              <button>Search</button>
            </div> */}
     </div>

    




    
     {/* <div className="featured">
        <Featuredcard/>
     </div>

    
     <div className="employes">
        <div className="container">
           <div className="one">
              <img src="/images/one.png" alt="" />
              <h3>4k</h3>
              <h3>Fulltime</h3>
           </div>
           <div className="two">
              <img src="/images/two.png" alt="" />
              <h3>2k</h3>
              <h3>parttime</h3>
           </div>
           <div className="three">
              <img src="/images/three.png" alt="" />
              <h3>24Hr</h3>
              <h3>Helpdesk</h3>
           </div>

        </div>
     </div>

    

     <div className="vacancytype">
        <Vacancytype/>
     </div>


     <div className="footer">
      <Footer/>
     </div> */}

    </div>
  )
}
