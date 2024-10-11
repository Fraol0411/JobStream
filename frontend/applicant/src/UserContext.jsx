import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize state from local storage or set to null
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        console.log('Stored user from local storage:', storedUser);
        return storedUser ? JSON.parse(storedUser) : null; // Initialize state from local storage
    });

    console.log('Global user:', user); // Log the current user state

    // Effect to update local storage when user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Update local storage whenever user changes
        } else {
            localStorage.removeItem('user'); // Remove user from local storage if user is null
        }
    }, [user]);

    console.log('Global data user:', user); // Log the current user state after any updates

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );  
};

export const useUser = () => {
    return useContext(UserContext);
};
