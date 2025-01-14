import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/authservices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!AuthService.getToken());
    }, []);

    const login = async (userData) => {
        const token = await AuthService.login(userData);
        setIsAuthenticated(!!token);
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
