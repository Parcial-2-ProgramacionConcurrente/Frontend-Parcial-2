// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { AuthProvider } from './context/AuthContext.js'; // Asegúrate de que el contexto esté exportado correctamente
import './styles/homePage.css'; // Ajusta el nombre del archivo si es necesario


ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('root')
);
