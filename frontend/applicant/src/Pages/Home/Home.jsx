import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import styles from "./Home.module.scss";
import Carousel from "react-bootstrap/Carousel"; // Make sure to install react-bootstrap
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const descriptions = [
    "Discover your dream job.",
    "Join our team of talented professionals.",
    "Unlock new career opportunities.",
    "Transform your future with us.",
  ];
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);

  // Update description every 3 seconds with a delay between transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex((prevIndex) =>
        prevIndex === descriptions.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change description every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [descriptions.length]);

  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, x: -200 }, // Slide in from left
    visible: { opacity: 1, x: 0 }, // Center
  };
  const animationVariantsy = {
    hidden: { opacity: 0, y: -200 }, // Slide in from left
    visible: { opacity: 1.5, y: 0 }, // Center
  };
  const handleNAvigate = () => {
    navigate("/joblist");
  };
  return (
    <div className={styles.landing}>
      <motion.div
        className={styles.description}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 1 }} // Adjust duration as needed
      >
        <h1>
          join awash insurance{" "}
          <span>{descriptions[currentDescriptionIndex]}</span>
        </h1>
        <button onClick={handleNAvigate} className={styles.checkJobsButton}>
          Check All Available Jobs
        </button>
      </motion.div>

      <motion.div
        className={styles.carousel}
        initial="hidden"
        animate="visible"
        variants={animationVariantsy}
        transition={{ duration: 1 }} // Adjust duration as needed
        style={{ marginLeft: "auto" }} // Align carousel to the right
      >
        <div>
          <div className={styles.carouselitem}>
            <img
              className="d-block w-100"
              src="/images/womenlogo.png" // Replace with your image source
              alt="First slide"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
