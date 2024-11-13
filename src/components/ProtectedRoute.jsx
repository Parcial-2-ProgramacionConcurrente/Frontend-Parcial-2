// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
    const { authData } = useContext(AuthContext);

    if (!authData.isAuthenticated) {
        return <Navigate to="/" replace />; // Redirige a la página de inicio de sesión si no está autenticado
    }

    if (requiredRole && authData.role !== requiredRole) {
        return <Navigate to="/" replace />; // Redirige si el rol no coincide con el requerido
    }

    return children;
}

export default ProtectedRoute;
