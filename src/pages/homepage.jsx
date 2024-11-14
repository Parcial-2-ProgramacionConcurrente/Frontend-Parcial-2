// src/pages/Homepage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homePage.css';

function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Fábrica de Campanas de Gauss</h1>
                <p>Una simulación de la distribución normal a través del tablero de Galton.</p>
                <div className="button-container">
                    <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
                    <button onClick={() => navigate("/register")}>Registrarse</button>
                </div>
            </header>

            <section className="section about-gauss">
                <h2>¿Quién fue Sir Francis Galton?</h2>
                <p>
                    Sir Francis Galton fue un científico británico que realizó importantes contribuciones en
                    estadística, biología y genética. Inventó el "tablero de Galton" para demostrar la distribución
                    normal, conocida como la campana de Gauss. Su trabajo estableció fundamentos en teoría de la probabilidad
                    y métodos estadísticos que aún se usan hoy en día.
                </p>
            </section>

            <section className="section gauss-bell">
                <h2>¿Qué es la Campana de Gauss?</h2>
                <p>
                    La campana de Gauss, o distribución normal, es una representación matemática de datos distribuidos
                    de forma simétrica. En el tablero de Galton, las bolas caen y rebotan en una serie de clavos,
                    acumulándose en una forma de campana. Este fenómeno se observa en muchos sistemas naturales y
                    sociales.
                </p>
            </section>
        </div>
    );
}

export default Homepage;

