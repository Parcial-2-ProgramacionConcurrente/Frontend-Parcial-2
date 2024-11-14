import React from 'react';
import '/src/styles/BackendGaltonBoard.css'; // Importar el CSS

const BackendGaltonBoard = ({ distribution }) => {
    // Calcular el máximo número de bolas para normalizar las barras si es necesario
    const maxBalls = Math.max(...Object.values(distribution));

    // Obtener las claves ordenadas numéricamente
    const sortedKeys = Object.keys(distribution)
        .sort((a, b) => {
            const numA = parseInt(a.replace('contenedor_', ''));
            const numB = parseInt(b.replace('contenedor_', ''));
            return numA - numB;
        });

    // Construir las líneas para la representación vertical con bloques en lugar de asteriscos
    const chartLines = [];
    for (let i = maxBalls; i > 0; i--) {
        const line = sortedKeys.map((key) => {
            const value = distribution[key];
            return value >= i ? ' █ ' : '   '; // Usar bloques sólidos para las barras
        }).join('');
        chartLines.push(line);
    }

    // Construir las etiquetas y los conteos
    const labels = sortedKeys.map((key) => key.replace('contenedor_', '').padStart(3, ' ')).join('');
    const counts = sortedKeys.map((key) => {
        const value = distribution[key];
        return value.toString().padStart(3, ' ');
    }).join('');

    return (
        <div className="backend-galton-board">
            <h3>Distribución de bolas en los contenedores:</h3>
            <pre>
                {chartLines.map((line, index) => (
                    <div key={index} className="chart-line">{line}</div>
                ))}
                <hr />
                {labels}
                <br />
                {counts}
            </pre>
        </div>
    );
};

export default BackendGaltonBoard;
