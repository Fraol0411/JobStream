import React from 'react'
import { useRef } from 'react'
import './Navbar.scss'
import {FaBars , FaTimes } from "react-icons/fa"
export default function Navbar() {
 
     const navRef = useRef()

     const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav")
     }

  return (
    <>
       <header>

          <img src="/images/logo.png" alt="logo" />

           <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/joblist">Joblist</a>
                <a href="/contact">Contact</a>

                <div className="browse">
                    <input type="text" placeholder='search for jobs' />
                    <button>Get started</button>
                </div>

                <button className='nav-btn nav-btn-close' onClick={showNavbar}>
                    <FaTimes/>
                </button>
           </nav>


            <button className='nav-btn'>
                <FaBars onClick={showNavbar}/>
            </button>


       </header>
    </>
  )
}
