// src/pages/LoginPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import '../styles/Loginpage.css';

function LoginPage() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error
    const { authData, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // src/pages/LoginPage.jsx
    // src/pages/LoginPage.jsx
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRequest = { correo, password };

        try {
            const response = await loginUser(loginRequest);

            if (response.token && response.role) {
                login({ token: response.token, role: response.role });
                setErrorMessage(''); // Limpiar el mensaje de error si el login es exitoso
            } else {
                setErrorMessage('Error en la autenticación'); // Error genérico si faltan datos
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);

            // Accede al mensaje de error si existe, o asigna un mensaje genérico.
            const backendMessage = (typeof error.response?.data === 'string')
                ? error.response.data // Si es un string, úsalo directamente
                : error.response?.data?.message || 'Credenciales incorrectas'; // Si es un objeto, accede a "message"

            setErrorMessage(backendMessage);
        }
    };



    useEffect(() => {
        if (authData.isAuthenticated && authData.role) {
            switch (authData.role) {
                case 'admin':
                    navigate("/admin");
                    break;
                case 'user':
                    navigate("/user");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
    }, [authData, navigate]);

    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar el mensaje de error */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo:</label>
                    <input
                        type="text"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LoginPage;
