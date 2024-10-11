import React from 'react'
import "./Footer.scss"
export default function Footer() {
  return (
    <div className='footer'>
       <div className="contain">
          <div className="right">
               <h1>Awash Insutrance Company</h1>
               <p>More than 90+ branchs<br/> located all over Ethiopia<br/>HeadWQuarter Addis Abeba Mexico Center</p>
          </div>
          <div className="middle">
                <h1>Join Our Social Medias</h1>
                <div className="links">
                    <img src="" alt="facebook" />
                    <img src="" alt="linkdin" />
                    <img src="" alt="insta" />
                </div>

          </div>
          <div className="left">
                <h1>Contact Us</h1>
                <div className="contlist">
                    <p>+222 25 64 4564</p>
                    <p>aic@info.gmail</p>
                    <p>+251096460 6445</p>
                    <p>www.awashinsurance.com</p>
                </div>
          </div>
       </div>
       <div className="line">
          {/* create a straight line below the above divs */}
       </div>
       <p>Copywright@licence2024aic</p>
    </div>
  )
}
