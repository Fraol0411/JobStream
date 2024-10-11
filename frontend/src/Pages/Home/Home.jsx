import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import styles from './Home.module.scss';
import Carousel from 'react-bootstrap/Carousel'; // Make sure to install react-bootstrap

export default function Landing() {
  const descriptions = [
    "Discover your dream job.",
    "Join our team of talented professionals.",
    "Unlock new career opportunities.",
    "Transform your future with us.",
  ];

  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex((prevIndex) =>
        prevIndex === descriptions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change description every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [descriptions.length]);

  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, x: -200 }, // Slide in from left
    visible: { opacity: 1, x: 0 }, // Center
  };
  const animationVariantsy = {
   hidden: { opacity: 0, y: -200 }, // Slide in from left
   visible: { opacity: 1, y: 0 }, // Center
 };

  return (
    <div className={styles.landing}>
      <motion.div
        className={styles.description}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={{ duration: 1}} // Adjust duration as needed
      >
        <h1>join awash insurance <span> {descriptions[currentDescriptionIndex]}</span> </h1>
        <button className={styles.checkJobsButton}>
          Check All Available Jobs
        </button>
      </motion.div>

      <motion.div
        className={styles.carousel}
        initial="hidden"
        animate="visible"
        variants={animationVariantsy}
        transition={{ duration: 1 }} // Adjust duration as needed
        style={{ marginLeft: 'auto' }} // Align carousel to the right
      >
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="image1.jpg" // Replace with your image source
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="image2.jpg" // Replace with your image source
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="image3.jpg" // Replace with your image source
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </motion.div>
    </div>
  );
}
