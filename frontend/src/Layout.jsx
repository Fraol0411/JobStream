import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar'; // Adjust the path as necessary
import Login from './Pages/Login/Login';
import "./Layout.scss"

const Layout = () => {
  const location = useLocation();

  // List of routes where the Navbar should not be displayed
  const hideNavbarRoutes = ['/login'];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <main className='container'>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
