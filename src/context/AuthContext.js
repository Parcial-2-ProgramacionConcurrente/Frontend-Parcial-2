// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState({
        isAuthenticated: false,
        token: null,
        role: null,
    });

    const login = (data) => {
        setAuthData({
            isAuthenticated: true,
            token: data.token,
            role: data.role,
        });
        console.log("AuthData actualizado:", { isAuthenticated: true, token: data.token, role: data.role });
    };

    const logout = () => {
        setAuthData({
            isAuthenticated: false,
            token: null,
            role: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}