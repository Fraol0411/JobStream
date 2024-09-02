import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import Joblist from './Pages/Joblist/Joblist';
import Login from './Pages/Login/Login';


export default function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/joblist' element={<Joblist/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>    
   </Router>
  )
}

