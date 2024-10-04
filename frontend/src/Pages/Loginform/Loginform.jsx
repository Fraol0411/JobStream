// import React from 'react'
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import styles from './Login.module.scss'; 
// import { useRef} from 'react';
// import { useNavigate } from 'react-router-dom';
// export default function Loginform() {

//     // in function
//     const navigate = useNavigate()
//     const activeRef = useRef()

//     const showNavbar = () =>{
//        activeRef.current.classList.toggle("signupmode")
//     }
//     const handleNavigation =()=>{
//         navigate('/joblist')
//     }


//     // api 


//     // div file
//   return (
//  <body>
//         <div className={`${styles.container} ${styles.sinnupmode}` } ref={activeRef}>
//             <div className={styles.formcontainer} >
//                 <div className={styles.signinSingup}>
//                     {/* sing in part */}
//                     <form className={styles.signinForm}>
//                         <img className={styles.logoimg} src="/images/logo.png" alt="" />
//                         <h2 className={styles.title}>Sign in</h2>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-user'></i>
//                             <input type="text" placeholder='User name' />
//                         </div>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-lock'></i>
//                             <input type="password" placeholder='password' />
//                         </div>
//                         <input type="submit" value='login' className={`${styles.btn} ${styles.solid}`} />

//                     </form>
                 
//                     {/* sing up part */}
//                     <form className={styles.signupForm}>
//                         <img className={styles.logoimg} src="/images/logo.png" alt="" />
//                         <h2 className={styles.title}>Sign Up</h2>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-user'></i>
//                             <input type="text" placeholder='username' />
//                         </div>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-envelope'></i>
//                             <input type="email" placeholder='Email' />
//                         </div>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-envelope'></i>
//                             <input type="email" placeholder='CGPA' />
//                         </div>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-lock'></i>
//                             <input type="password" placeholder='password' />
//                         </div>
//                         <div className={styles.inputField}>
//                             <i className='fas fa-lock'></i>
//                             <input type="password" placeholder='confirm password' />
//                         </div>
//                         <div className={styles.dropdown}>
//                             <i className='fas fa-file'></i>
//                             <label htmlFor="">Applicant</label>
//                             <select name="" id="">
//                                 <option value="" disabled selected>Select an option</option>
//                                 <option value="fresh_graduate">Fresh Graduate</option>
//                                 <option value="external_experience">External Experience</option>
//                                 <option value="awash_staff">Awash Staff</option>
//                             </select>
//                         </div>
//                         <input onClick={handleNavigation}  type="submit" value='sign up' className={`${styles.btn} ${styles.solid}`} />


//                     </form>

//                 </div>
//             </div>
       

//        <div className={styles.panelscontainer}>
//             <div className={`${styles.panel} ${styles.leftpanel}`}>
//                 <div className={styles.content}>
//                     <h3>New here ?</h3>
//                     <p>
//                     Register for Awash Insurance job portal and follow up new vacancy
//                     </p>
//                     <button onClick={showNavbar} className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">
//                     Sign up
//                     </button>
//                 </div>
//                 <img src="images/logimg1.svg" className={styles.image} alt="" />
//             </div>

//             <div className={`${styles.panel} ${styles.rightpanel}`}>
//                 <div className={styles.content}>
//                     <h3>One of Us?</h3>
//                     <p>
//                     Already enrolled into Awash Insurance Job Portal 
//                     </p>
//                     <button onClick={showNavbar} className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">
//                     Sign in
//                     </button>
//                 </div>
//                 <img src="images/logimg2.svg" className={styles.image} alt="" />
//             </div>

//        </div>
//     </div>
//  </body>
    



//   )
// }

// --------- //

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './Login.module.scss';

export default function LoginForm() {
    const navigate = useNavigate();
    const activeRef = useRef();
    
    // State variables for form inputs and errors
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '',  password: '', confirmPassword: '', applicantType: '' });
    const [errorMessage, setErrorMessage] = useState('');

    console.log(loginData)
    console.log(registerData)

    const showNavbar = () => {
        activeRef.current.classList.toggle("signupmode");
    };

    const handleNavigation = () => {
        navigate('/joblist');
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Successful login, navigate to job list") 
                handleNavigation();
            } else {
                // Handle error
                setErrorMessage(result.message || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    // Handle registration submission
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            });
            const result = await response.json();
            if (response.ok) {
                // Successful registration, navigate to job list
                handleNavigation();
            } else {
                // Handle error
                setErrorMessage(result.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`${styles.container} ${styles.sinnupmode}`} ref={activeRef}>
            <div className={styles.formcontainer}>
                <div className={styles.signinSingup}>
                    {/* Sign in part */}
                    <form className={styles.signinForm} onSubmit={handleLogin}>
                        <img className={styles.logoimg} src="/images/logo.png" alt="" />
                        <h2 className={styles.title}>Sign in</h2>
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <div className={styles.inputField}>
                            <i className='fas fa-user'></i>
                            <input 
                                type="text" 
                                placeholder='User name' 
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} 
                            />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-lock'></i>
                            <input 
                                type="password" 
                                placeholder='Password' 
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} 
                            />
                        </div>
                        <input type="submit" value='Login' className={`${styles.btn} ${styles.solid}`} />
                    </form>

                    {/* Sign up part */}
                    <form className={styles.signupForm} onSubmit={handleRegister}>
                        <img className={styles.logoimg} src="/images/logo.png" alt="" />
                        <h2 className={styles.title}>Sign Up</h2>
                        <div className={styles.inputField}>
                            <i className='fas fa-user'></i>
                            <input 
                                type="text" 
                                placeholder='Username' 
                                value={registerData.username}
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} 
                            />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-envelope'></i>
                            <input 
                                type="email" 
                                placeholder='Email' 
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} 
                            />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-lock'></i>
                            <input 
                                type="password" 
                                placeholder='Password' 
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} 
                            />
                        </div>
                        <div className={styles.inputField}>
                            <i className='fas fa-lock'></i>
                            <input 
                                type="password" 
                                placeholder='Confirm Password' 
                                value={registerData.confirmPassword}
                                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} 
                            />
                        </div>
                        <div className={styles.dropdown}>
                            <i className='fas fa-file'></i>
                            <label htmlFor="">Applicant</label>
                            <select 
                                value={registerData.applicantType}
                                onChange={(e) => setRegisterData({ ...registerData, applicantType: e.target.value })}>
                                <option value="" disabled>Select an option</option>
                                <option value="Fresh Graduate">Fresh Graduate</option>
                                <option value="External applicant">External Experience</option>
                                <option value="Awash staff">Awash Staff</option>
                            </select>
                        </div>
                        <input type="submit" value='Sign Up' className={`${styles.btn} ${styles.solid}`} />
                    </form>
                </div>
            </div>
            <div className={styles.panelscontainer}>
                <div className={`${styles.panel} ${styles.leftpanel}`}>
                    <div className={styles.content}>
                        <h3>New here?</h3>
                        <p>Register for the Awash Insurance job portal and follow up on new vacancies.</p>
                        <button onClick={showNavbar} className={`${styles.btn} ${styles.transparent}`}>
                            Sign Up
                        </button>
                    </div>
                    <img src="images/logimg1.svg" className={styles.image} alt="" />
                </div>
                <div className={`${styles.panel} ${styles.rightpanel}`}>
                    <div className={styles.content}>
                        <h3>One of Us?</h3>
                        <p>Already enrolled in the Awash Insurance Job Portal.</p>
                        <button onClick={showNavbar} className={`${styles.btn} ${styles.transparent}`}>
                            Sign In
                        </button>
                    </div>
                    <img src="images/logimg2.svg" className={styles.image} alt="" />
                </div>
            </div>
        </div>
    );
}

