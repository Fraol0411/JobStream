import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Joblist from "./Pages/Joblist/Joblist";
import Layout from "./Layout";
import Loginform from "./Pages/Loginform/Loginform";
import Loading from "./Component/Loading/Loading";
import Application from "./Pages/Application/Application";
import Profile from "./Pages/Profile/Profile";
import Header from "./Pages/Header/Header";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Loginform />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="joblist" element={<Joblist />} />
          <Route path="home" element={<Home />} />
          <Route path="application/:id" element={<Application />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="header" element={<Header />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
