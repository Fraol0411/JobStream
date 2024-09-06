import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import Joblist from './Pages/Joblist/Joblist';
import Layout from './Layout';
import Loginform from './Pages/Loginform/Loginform'
import Profileset from './Pages/Profileset/Profileset';
import Loading from './Component/Loading/Loading';

export default function AppRoutes() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="joblist" element={<Joblist />} />
          <Route path='loginform' element={<Loginform/>}/>
          <Route path='profileset' element={<Profileset/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

