// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     // Initialize state from local storage or set to null
//     const [user, setUser] = useState(() => {
//         const storedUser = localStorage.getItem('user');
//         console.log('Stored user from local storage:', storedUser);
//         return storedUser ? JSON.parse(storedUser) : null; // Initialize state from local storage
//     });

//     console.log('Global user:', user); // Log the current user state

//     // Effect to update local storage when user state changes
//     useEffect(() => {
//         if (user) {
//             localStorage.setItem('user', JSON.stringify(user)); // Update local storage whenever user changes
//         } else {
//             localStorage.removeItem('user'); // Remove user from local storage if user is null
//         }
//     }, [user]);

//     console.log('Global data user:', user); // Log the current user state after any updates

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//     return useContext(UserContext);
// };

/*****************************/

// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize user and application_id state from localStorage or set to null
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Initialize user state from local storage
  });

  const [application_id, setApplicationId] = useState(() => {
    const storedApplicationId = localStorage.getItem("application_id");
    return storedApplicationId ? storedApplicationId : null; // Initialize application_id state from local storage
  });

  // Log user and application_id for debugging
  console.log("Global user:", user);
  console.log("Global application_id:", application_id);

  // Effect to update local storage when user or application_id changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Update local storage whenever user changes
    } else {
      localStorage.removeItem("user"); // Remove user from local storage if user is null
    }

    if (application_id) {
      localStorage.setItem("application_id", application_id); // Update local storage for application_id
    } else {
      localStorage.removeItem("application_id"); // Remove application_id from local storage if null
    }
  }, [user, application_id]);

  return (
    <UserContext.Provider
      value={{ user, setUser, application_id, setApplicationId }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user and application_id context
export const useUser = () => {
  return useContext(UserContext);
};
