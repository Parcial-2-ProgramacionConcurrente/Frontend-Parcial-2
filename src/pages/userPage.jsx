// src/components/userPage.jsx
import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/userPage.css';
import {AuthContext} from "../context/AuthContext";


function UserPage() {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();      // Llama a la función logout del contexto
        navigate('/'); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="userpage">
            <div className="banner-container">
            </div>
            <h1>Página de Usuario</h1>
            <button onClick={handleLogout} className="button1"> Log Out</button>

        </div>
    );
}

export default UserPage;
