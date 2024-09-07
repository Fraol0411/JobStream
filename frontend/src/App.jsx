// import React, { useState, useEffect } from "react";
// import AppRoutes from "./AppRoutes";
// import Loading from "./Component/Loading/Loading";
// import "./App.scss";

// function App() {
//   const [loading, setLoading] = useState(false);
  

//   useEffect(() => {
//     const handleNavigation = () => {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false); // Hide loading screen after navigation
//       }, 50000); // Adjust timeout to match your loading screen duration
//     };
       

//     // Add event listener for route changes
//     window.addEventListener('popstate', handleNavigation);
//     window.addEventListener('pushstate', handleNavigation);
//     window.addEventListener('replacestate', handleNavigation);


//     // Clean up event listeners
//     // return () => {
//     //   window.removeEventListener('popstate', handleNavigation);
//     //   window.removeEventListener('pushstate', handleNavigation);
//     //   window.removeEventListener('replacestate', handleNavigation);
//     // };
//   }, []);

//   return (
//     <div className="App">
//       {loading && <Loading />}
//       <AppRoutes />
//     </div>
//   );
// }

// export default App;



import React from "react"
import AppRoutes from "./AppRoutes"
// import "./App.scss"

function App() {
 
  return (
    <div className="App">
        <AppRoutes/>
    </div>    
  )
}

export default App


// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import AppRoutes from './AppRoutes'; // Ensure your routes are properly imported
// import './App.scss';

// function App() {
//   return (
//     <div className="App">
//       {/* Wrap your application inside the Router */}
//       <Router>
//         <AppRoutes />
//       </Router>
//     </div>
//   );
// }

// export default App;

