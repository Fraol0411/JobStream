import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './Login.module.scss'; 
import { useRef} from 'react';
import { useNavigate } from 'react-router-dom';
export default function Loginform() {
    const navigate = useNavigate()
    const activeRef = useRef()

    const showNavbar = () =>{
       activeRef.current.classList.toggle("signupmode")
    }
    const handleNavigation =()=>{
        navigate('/joblist')
    }
  return (
 <body>
        <div className={`${styles.container}`} ref={activeRef}>
            <div className={styles.formcontainer} >
                <div className={styles.signinSingup}>
                    {/* sing in part */}
                    <form className={styles.signinForm}>
                        <img className={styles.logoimg} src="/images/logo.png" alt="" />
                        <h2 className={styles.title}>Sign in</h2>
                        <div className={styles.inputField}>
                            <i className='fas fa-user'></i>
                            <input type="text" placeholder='User name' />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-lock'></i>
                            <input type="password" placeholder='password' />
                        </div>
                        <input type="submit" value='login' className={`${styles.btn} ${styles.solid}`} />

                        <p className={styles.socialtext}> Or Sing in with social platform</p>

                        <div className={styles.socialmedia}>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-facebook'/>
                            </a>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-google'/>
                            </a>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-twitter'/>
                            </a>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-linkedin-in'/>
                            </a>
                        </div>
                    </form>
                 
                    {/* sing up part */}
                    <form className={styles.signupForm}>
                        <img className={styles.logoimg} src="/images/logo.png" alt="" />
                        <h2 className={styles.title}>Sign Up</h2>
                        <div className={styles.inputField}>
                            <i className='fas fa-user'></i>
                            <input type="text" placeholder='username' />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-envelope'></i>
                            <input type="email" placeholder='Email' />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-lock'></i>
                            <input type="password" placeholder='password' />
                        </div>
                        <input onClick={handleNavigation}  type="submit" value='sign up' className={`${styles.btn} ${styles.solid}`} />

                        <p className={styles.socialtext}> Or Sing up with social platform</p>

                        <div className={styles.socialmedia}>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-facebook'/>
                            </a>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-google'/>
                            </a>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-twitter'/>
                            </a>
                            <a href="#" className={styles.socialicons}>
                                <i className='fab fa-linkedin-in'/>
                            </a>
                        </div>
                    </form>

                </div>
            </div>
       

       <div className={styles.panelscontainer}>
            <div className={`${styles.panel} ${styles.leftpanel}`}>
                <div className={styles.content}>
                    <h3>New here ?</h3>
                    <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                    ex ratione. Aliquid!
                    </p>
                    <button onClick={showNavbar} className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">
                    Sign up
                    </button>
                </div>
                <img src="images/logimg1.svg" className={styles.image} alt="" />
            </div>

            <div className={`${styles.panel} ${styles.rightpanel}`}>
                <div className={styles.content}>
                    <h3>One of Us?</h3>
                    <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                    ex ratione. Aliquid!
                    </p>
                    <button onClick={showNavbar} className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">
                    Sign in
                    </button>
                </div>
                <img src="images/logimg2.svg" className={styles.image} alt="" />
            </div>

       </div>
    </div>
 </body>
    



  )
}
