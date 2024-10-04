import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useMutation } from '@tanstack/react-query';
import { useMutation } from 'react-query'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './Login.module.scss';

// Function to handle login API request
const loginUser = async (loginData) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

// Function to handle registration API request
const registerUser = async (registerData) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
};




export default function LoginForm() {

    const navigate = useNavigate();
    const activeRef = useRef();
    
    
    
    // State variables for form inputs and errors
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', password: '', email: '',role:'applicant', applyfor: '' });
    const [errorMessage, setErrorMessage] = useState('');

    

    // Handle login mutation
    const loginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, save token)
            navigate('/joblist');
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });

    // Handle registration mutation
    const registerMutation = useMutation(registerUser, {
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            // Handle successful registration (e.g., redirect, display success message)
            navigate('/loginform');
            window.location.reload();
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });

    const showNavbar = () => {
        activeRef.current.classList.toggle("signupmode");
    };

    // Handle login submission
    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate(loginData); // Call login mutation
    };

    // Handle registration submission
    const handleRegister = (e) => {
        e.preventDefault();
        registerMutation.mutate(registerData); // Call registration mutation
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
                                placeholder='email' 
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} 
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
                                onChange={(e) => setRegisterData({ ...registerData, applyfor: e.target.value })}>
                                <option value="" disabled>Select an option</option>
                                <option value="Fresh Graduate">Fresh Graduate</option>
                                <option value="External applicant">External Applicant</option>
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

