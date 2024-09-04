import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar'; // Adjust the path as necessary
import "./Layout.scss"

const Layout = () => {
  const location = useLocation();

  // List of routes where the Navbar should not be displayed
  const hideNavbarRoutes = ['/loginform'];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main className='containe'>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
