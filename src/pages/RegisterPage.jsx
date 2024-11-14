// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Registerpage.css';

function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate();

    // src/pages/RegisterPage.jsx
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
            setErrorMessage(''); // Limpiar el mensaje de error en caso de éxito
            navigate("/login"); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error('Error al registrar usuario:', error);

            // Accede al mensaje de error si existe, o asigna un mensaje genérico.
            const backendMessage = (typeof error.response?.data === 'string')
                ? error.response.data // Si es un string, úsalo directamente
                : error.response?.data?.message || 'Error al registrar usuario';

            setErrorMessage(backendMessage);
        }
    };


    return (
        <div className="register-page">
            <h1>Registrarse</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mostrar el mensaje de error */}
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
        </div>
    );
}

export default RegisterPage;
