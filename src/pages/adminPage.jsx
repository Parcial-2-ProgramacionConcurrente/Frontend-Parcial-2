import React, { useContext, useState } from 'react';
import { registerUser } from '../services/apiService';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '/src/styles/Adminpage.css';
import MessagePanel from '../components/MessagePanel';
import Nieve from '../components/Nieve'; // Import the Nieve component

function AdminPage() {
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState('');
    const [rolNombre, setRolNombre] = useState('user');

    const { login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const registerData = {
            nombre,
            apellido1,
            apellido2,
            correo,
            telefono: parseInt(telefono),
            direccion,
            password,
            rolNombre
        };

        registerUser(registerData)
            .then((response) => {
                if (response.data.token && response.data.role) {
                    login({ token: response.data.token, role: response.data.role });
                    if (response.data.role === 'admin') {
                        navigate("/admin");
                    } else if (response.data.role === 'user') {
                        navigate("/user");
                    }
                } else {
                    alert('Error en el registro');
                }
            })
            .catch(error => {
                console.error('Error al registrar usuario:', error);
                alert('Error al registrar usuario');
            });
    };

    return (
        <div className="admin-page">
            <Nieve /> {/* Add the Nieve component */}
            <h1>Página de Administrador</h1>
            <button className="button1" onClick={handleLogout}>Log Out</button>

            <div className="adminpage-content">
                {/* Formulario de Registro de Usuario */}
                <form className="user-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Primer Apellido:</label>
                        <input type="text" value={apellido1} onChange={(e) => setApellido1(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Segundo Apellido:</label>
                        <input type="text" value={apellido2} onChange={(e) => setApellido2(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Correo:</label>
                        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Dirección:</label>
                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Rol:</label>
                        <select value={rolNombre} onChange={(e) => setRolNombre(e.target.value)}>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>
                    <button type="submit">Registrar Usuario</button>
                </form>

                {/* Panel de Mensajes de RabbitMQ */}
                <MessagePanel />
            </div>
        </div>
    );
}
export default AdminPage;