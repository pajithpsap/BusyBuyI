import React, { createContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create the provider component
const AuthProviders = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null); // State to store user data
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // To keep a copy of all products
    const login = () => {
        setIsLoggedIn(true);
       // setUserData(userData); // Set the user data upon login
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null); // Clear user data upon logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userData, setUserData, products, setProducts, allProducts, setAllProducts }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProviders };
