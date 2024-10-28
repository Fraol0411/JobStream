import React, { useNavigate, useState } from "react";
import "./Header.scss";
// import { AppWrap } from '../../wrapper/Appwrap';
import { motion } from "framer-motion";

import { useEffect } from "react";
// import {urlFor,client} from '../../client'

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
function Header() {
  const [proimg, setProimg] = useState([]);

  console.log(proimg.img);
  return (
    <div id="Home" className="app__header ">
      <motion.div
        whileInView={{ y: [0, 60], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        className="app__header-info"
      >
        <div className="textpart">
          <h1>
            Hi, am Fraol <span>Dabi</span>
          </h1>
          <p>
            Official portfolio website <br />
            showcase skills and exprience <br />{" "}
          </p>
          <h2 className="head-text1">
            Java-script Front<span>End Web Developer</span>
          </h2>
          <h2 className="head-text1">
            Python <span>Developer</span>
          </h2>
          <h2 className="head-text1">
            UX/UI <span>Designer</span>
          </h2>
          <a href="#Contact me">Contact Me</a>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ x: [80, 0], opacity: [0, 1] }}
        transition={{ duration: 2, delayChildren: 0.5 }}
        className="app__header-image"
      >
        <>
          <img src={images.shape} alt="shape" className="shape" />
          <img src={images.bgpro} alt="nothing" className="profile" />
          {/* <img src={urlFor(image.img)} alt="profile" className='profile'/>   */}
        </>
      </motion.div>
    </div>
  );
}

export default Header;
