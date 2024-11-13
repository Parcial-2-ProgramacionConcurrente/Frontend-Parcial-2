// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Registerpage.css'


function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
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
            navigate("/login"); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario');
        }
    };

    return (
        <div className="register-page">
            <h1>Registrarse</h1>
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
