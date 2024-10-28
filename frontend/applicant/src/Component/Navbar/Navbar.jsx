// import React, { useState } from "react";
// import { useRef } from "react";
// import styles from "./Navbar.module.scss";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../Loaders/LoadingSpinner";

// // Fetch job data from the backend
// const searchJobs = async () => {
//   // console.log('first or letter',user)
//   const res = await fetch('http://localhost:5000/api/jobs/alljobs');
//   if (!res.ok) {
//     throw new Error('Failed to fetch jobs');
//   }

//     // Simulate a delay
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // 2-second delay

//   return res.json();
// };

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleNavigation = () => {
//     navigate("/");
//   };

//   const navRef = useRef();

//   const showNavbar = () => {
//     navRef.current.classList.toggle("responsive_nav");
//   };

//   return (
//     <>
//       <header className={styles.headering}>
//         <img src="/images/logo.png" alt="logo" />

//         <nav ref={navRef}>
//           <a href="/home">Home</a>
//           <a href="/joblist">Joblist</a>
//           <a href="/profile">Profile</a>

//           <div className={styles.browse}>
//             <input type="text" placeholder="search for jobs" />
//             <button onClick={handleNavigation}>Search</button>
//           </div>

//           <div className={styles.browse}>
//             <button onClick={handleNavigation}>Log out</button>
//           </div>

//           <button
//             className={`${styles.navbtn} ${styles.navbtnclose}`}
//             onClick={showNavbar}
//           >
//             <FaTimes />
//           </button>
//         </nav>

//         <button className={styles.navbtn}>
//           <FaBars onClick={showNavbar} />
//         </button>
//       </header>
//     </>
//   );
// }

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import LoadingSpinner from "../Loaders/LoadingSpinner";

export default function Navbar() {
  const [searchTitle, setSearchTitle] = useState(""); // Track search input

  console.log(searchTitle);

  const navigate = useNavigate();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleSearch = () => {
    if (navRef.current.classList.contains("responsive_nav")) {
      navRef.current.classList.remove("responsive_nav");
    }
    if (searchTitle.trim()) {
      // Navigate to Joblist page with searchTerm as query parameter
      navigate(`/joblist?title=${encodeURIComponent(searchTitle)}`);
    }
  };

  return (
    <>
      <header className={styles.headering}>
        <img src="/images/logo.png" alt="logo" />

        <nav ref={navRef}>
          <a href="/home">Home</a>
          <a href="/joblist">Joblist</a>
          <a href="/profile">Profile</a>

          <div className={styles.browse}>
            <input
              type="text"
              placeholder="Search for jobs"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className={styles.browse}>
            <button onClick={() => navigate("/")}>Log out</button>
          </div>

          <button
            className={`${styles.navbtn} ${styles.navbtnclose}`}
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
        </nav>

        <button className={styles.navbtn}>
          <FaBars onClick={showNavbar} />
        </button>
      </header>
    </>
  );
}
