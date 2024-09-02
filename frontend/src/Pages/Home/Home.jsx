import React from 'react'
import './Home.scss'
import Featuredcard from '../../Component/Featuredcard/Featuredcard'
import Vacancytype from '../../Component/Vacancytype/Vacancytype'
import Footer from '../../Component/Footer/Footer'
export default function Landing() {
  return (
    <div  className="landing">

     {/* <div className="Hero">
          <div className="landingholder">
              <div className="description">
                  <h1>Join The Leading Insurance Company</h1>
                  <img src="/images/vector.png" alt="" />
              </div>
              <div className="imageside">
                  <div className="circle">
                    <h1>We Flow With You</h1>
                  </div>
                  <div className="buildingimg">
                    <img src="/images/buildingimg.png" alt="" />
                  </div>
              </div>
            </div>
            <div className="inputfield">
              <input type="text" placeholder='search for jobs'/>
              <button>Search</button>
            </div>
     </div> */}

     {/* // featured jobs list */}
     <div className="featured">
        {/* <Featuredcard/> */}
     </div>

     {/* employyes number dispaly */}
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

     {/* vacancy types */}

     <div className="vacancytype">
        {/* <Vacancytype/> */}
     </div>

     {/* footer */}

     <div className="footer">
      {/* <Footer/> */}
     </div>

     

        
    </div>
  )
}
