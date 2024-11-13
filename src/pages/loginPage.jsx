// src/pages/LoginPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import '../styles/login.css';

function LoginPage() {
    const [nombreOrCorreo, setNombreOrCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { authData, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRequest = { nombreOrCorreo, password };

        try {
            const response = await loginUser(loginRequest);

            if (response.token && response.role) {
                login({ token: response.token, role: response.role });
            } else {
                alert('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas');
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
            <div className="login-container">
                <h1>Iniciar Sesión</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de Usuario o Correo:</label>
                        <input
                            type="text"
                            value={nombreOrCorreo}
                            onChange={(e) => setNombreOrCorreo(e.target.value)}
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
        </div>
    );
}

export default LoginPage;
