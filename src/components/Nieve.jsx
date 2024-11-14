import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Definición de la animación para los copos de nieve
const snow = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

// Contenedor para los copos de nieve
const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
`;

// Estilo para cada copo de nieve
const Snowflake = styled.div`
  position: absolute;
  top: -10px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: ${snow} linear infinite;
`;

const Nieve = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const maxSnowflakes = 100; // Máximo de copos visibles
        const interval = setInterval(() => {
            setSnowflakes(prev => {
                if (prev.length >= maxSnowflakes) return prev;
                const newFlake = {
                    id: Date.now() + Math.random(), // ID único
                    left: Math.random() * 100, // Posición horizontal en porcentaje
                    size: Math.random() * 10 + 5, // Tamaño en px
                    duration: Math.random() * 5 + 2, // Duración de la animación en segundos
                };
                return [...prev, newFlake];
            });
        }, 200); // Crear un nuevo copo cada 200ms

        return () => clearInterval(interval);
    }, []);

    const handleAnimationEnd = (id) => {
        setSnowflakes(prev => prev.filter(flake => flake.id !== id));
    };

    return (
        <SnowContainer>
            {snowflakes.map(flake => (
                <Snowflake
                    key={flake.id}
                    style={{
                        left: `${flake.left}vw`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.duration}s`,
                    }}
                    onAnimationEnd={() => handleAnimationEnd(flake.id)}
                />
            ))}
        </SnowContainer>
    );
};

export default Nieve;
