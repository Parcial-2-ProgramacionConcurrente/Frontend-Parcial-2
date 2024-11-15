import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import '/src/styles/Userpage.css';
import GaltonBoard from "../components/GaltonBoard.jsx";

function UserPage() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [simulationFinished, setSimulationFinished] = useState(false);
    const [distribution, setDistribution] = useState(null);

    const handleLogout = () => {
        logout();      // Llama a la función logout del contexto
        navigate('/'); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="userpage">
            <div className="banner-container">
            </div>
            <GaltonBoard
                onSimulationFinish={(dist) => {
                    setSimulationFinished(true);
                    setDistribution(dist);
                }}
            />
            {simulationFinished && distribution && (
                <button onClick={handleLogout} className="button1">Log Out</button>
            )}
        </div>
    );
}

export default UserPage;