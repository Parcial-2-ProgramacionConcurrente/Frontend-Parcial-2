import React, { useState } from 'react';
import { registerUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Registerpage.css';
import Nieve from '../components/Nieve'; // Import the Nieve component

function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerData = {
            nombre,
            correo,
            password,
            rolNombre: 'user',
        };

        try {
            await registerUser(registerData);
            alert('Usuario registrado exitosamente');
            setErrorMessage('');
            navigate("/login");
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            const backendMessage = (typeof error.response?.data === 'string')
                ? error.response.data
                : error.response?.data?.message || 'Error al registrar usuario';
            setErrorMessage(backendMessage);
        }
    };

    return (
        <div className="register-page">
            <Nieve /> {/* Add the Nieve component */}
            <h1>Registrarse</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Registrar</button>
            </form>
            <button className="button1" onClick={() => navigate('/')}>Home Page</button>
        </div>
    );
}

export default RegisterPage;