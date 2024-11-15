import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import '../styles/Loginpage.css';
import Nieve from '../components/Nieve'; // Import the Nieve component

function LoginPage() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { authData, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRequest = { correo, password };

        try {
            const response = await loginUser(loginRequest);

            if (response.token && response.role) {
                login({ token: response.token, role: response.role });
                setErrorMessage('');
            } else {
                setErrorMessage('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            const backendMessage = (typeof error.response?.data === 'string')
                ? error.response.data
                : error.response?.data?.message || 'Credenciales incorrectas';
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
            <Nieve /> {/* Add the Nieve component */}
            <h1>Iniciar Sesión</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
            <button className="button1" onClick={() => navigate('/')}>Home Page</button>
        </div>
    );
}

export default LoginPage;