import React, { useState } from 'react'
import { useRef } from 'react'
import styles from './Navbar.module.scss'
import {FaBars , FaTimes } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Loaders/LoadingSpinner'
export default function Navbar() {
     const navigate = useNavigate()

     const handleNavigation  = () =>{
          navigate('/')
     }
 
     const navRef = useRef()

     const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav")
     }


  return (
    <>
       <header className={styles.headering}>

          <img src="/images/logo.png" alt="logo" />

           <nav ref={navRef}>
                <a href="/home">Home</a>                
                <a href="/joblist">Joblist</a>
                <a href="/profile">Profile</a>
                <a href="/contact">Contact</a>

                <div className={styles.browse}>
                    <input type="text" placeholder='search for jobs' />
                    <button onClick={handleNavigation}>
                        Get Started
                    </button>
                </div>

                <button className={`${styles.navbtn} ${styles.navbtnclose}`} onClick={showNavbar}>
                    <FaTimes/>
                </button>
           </nav>


            <button className={styles.navbtn}>
                <FaBars onClick={showNavbar}/>              
            </button>


       </header>
    </>
  )
}
