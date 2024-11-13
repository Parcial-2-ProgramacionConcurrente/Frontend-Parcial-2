// src/pages/LoginPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';

function LoginPage() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { authData, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRequest = { correo, password };
        console.log("Intentando iniciar sesión con:", loginRequest);

        try {
            const response = await loginUser(loginRequest);
            console.log("Respuesta del servidor al iniciar sesión:", response);

            if (response.token && response.role) {
                login({ token: response.token, role: response.role });
                console.log("Inicio de sesión exitoso, rol:", response.role);
            } else {
                console.log("Error en la autenticación: token o rol no presentes en la respuesta.");
                alert('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas');
        }
    };

    useEffect(() => {
        console.log("Verificando autenticación en useEffect:", authData);
        if (authData.isAuthenticated && authData.role) {
            console.log("Redirigiendo según rol:", authData.role);
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
        </div>
    );
}

export default LoginPage;
