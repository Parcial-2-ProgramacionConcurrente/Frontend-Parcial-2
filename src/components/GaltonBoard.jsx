import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import BackendGaltonBoard from "./BackendGaltonBoard.jsx";
import axios from 'axios';
import { api } from '/src/services/apiService.js'; // Importa correctamente
import '/src/styles/GaltonBoard.css'; // Importar el CSS

const GaltonBoard = ({ onSimulationFinish }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const runnerRef = useRef(null);
    const [simulationStarted, setSimulationStarted] = useState(false);
    const [distribution, setDistribution] = useState(null);
    const [simulationFinished, setSimulationFinished] = useState(false);
    const [galtonBoardId, setGaltonBoardId] = useState(null); // Nuevo estado para almacenar el galtonBoardId

    // Variables compartidas
    const pegRadius = 5;
    const ballRadius = 5;
    const offsetX = 400;
    const offsetY = 100;
    const horizontalSpacing = 50;
    const verticalSpacing = 50;
    const numberOfRows = 11;
    const boardWidth = 600;
    const boardHeight = 500;
    const numberOfContainers = numberOfRows + 1;
    const containerWidth = boardWidth / numberOfContainers - 5;
    const containerHeight = 100;
    const containerOffsetY = offsetY + boardHeight + containerHeight / 2 + 50;

    useEffect(() => {
        const engine = engineRef.current;
        const world = engine.world;

        engine.gravity.y = 1.12;

        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 800,
                height: 800,
                wireframes: false,
                background: '#ffffff',
            },
        });

        const wallThickness = 10;
        const extendedBoardHeight = boardHeight + 200;

        const leftWall = Matter.Bodies.rectangle(
            offsetX - boardWidth / 2 - wallThickness / 2,
            offsetY + extendedBoardHeight / 2,
            wallThickness,
            extendedBoardHeight,
            {
                isStatic: true,
                label: 'Wall',
                render: { fillStyle: '#000000' },
            }
        );

        const rightWall = Matter.Bodies.rectangle(
            offsetX + boardWidth / 2 + wallThickness / 2,
            offsetY + extendedBoardHeight / 2,
            wallThickness,
            extendedBoardHeight,
            {
                isStatic: true,
                label: 'Wall',
                render: { fillStyle: '#000000' },
            }
        );

        Matter.World.add(world, [leftWall, rightWall]);

        for (let row = 1; row < numberOfRows; row++) {
            const pegsInRow = row + 1;
            const rowOffset = (pegsInRow - 1) * horizontalSpacing / 2;

            for (let col = 0; col < pegsInRow; col++) {
                const x = offsetX - rowOffset + col * horizontalSpacing;
                const y = offsetY + row * verticalSpacing;

                const peg = Matter.Bodies.circle(x, y, pegRadius, {
                    isStatic: true,
                    label: 'Peg',
                    render: {
                        fillStyle: '#aaa', // Color gris claro para simular metal
                        strokeStyle: '#666', // Borde para darle aspecto metálico
                        lineWidth: 1, // Grosor del borde
                        shadowBlur: 5, // Efecto de sombra difusa
                        shadowColor: '#cccccc' // Sombra clara para resaltar
                    },
                });
                Matter.World.add(world, peg);
            }
        }

        const containers = [];
        const containerSpacing = 5; // Aumenta el margen entre contenedores

        // Calcula el ancho total de los contenedores más el espacio entre ellos
        const totalWidth = numberOfContainers * containerWidth + (numberOfContainers - 1) * containerSpacing;

        // Ajusta initialOffsetX para centrar los contenedores en el tablero
        const initialOffsetX = offsetX - totalWidth / 2;

        for (let i = 0; i < numberOfContainers; i++) {
            const x = initialOffsetX + i * (containerWidth + containerSpacing) + containerWidth / 2;
            const y = containerOffsetY;

            const container = Matter.Bodies.rectangle(x, y, containerWidth, containerHeight, {
                isStatic: true,
                label: `Container_${i}`,
                render: {
                    fillStyle: '#333333', // Fondo oscuro para simular profundidad
                    strokeStyle: '#555555', // Borde más claro para resaltar los bordes
                    lineWidth: 2, // Grosor del borde
                    shadowBlur: 8, // Sombra difusa para dar efecto 3D
                    shadowColor: 'rgba(0, 0, 0, 0.7)' // Sombra oscura para realismo
                },
            });
            Matter.World.add(world, container);
            containers.push(container);
        }

        const invisibleFloor = Matter.Bodies.rectangle(
            offsetX,
            offsetY + boardHeight + containerHeight + 100,
            boardWidth,
            10,
            {
                isStatic: true,
                isSensor: true,
                label: 'InvisibleFloor',
            }
        );
        Matter.World.add(world, invisibleFloor);

        runnerRef.current = Matter.Runner.create();
        Matter.Runner.run(runnerRef.current, engine);
        Matter.Render.run(render);

        // Obtener el galtonBoardId antes de iniciar la simulación
        fetchGaltonBoardId();

        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
            Matter.Runner.stop(runnerRef.current);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    // Nueva función para obtener el galtonBoardId desde el backend
    const fetchGaltonBoardId = async () => {
        try {
            const response = await api.get('/fabricas'); // Usa 'api' en lugar de 'axios'
            if (response.data && response.data.length > 0) {
                const fabrica = response.data[0]; // Tomamos la primera fábrica
                const galtonBoardId = await getGaltonBoardIdByFabricaId(fabrica.id);
                setGaltonBoardId(galtonBoardId);
            } else {
                console.error('No se encontraron fábricas en el backend.');
            }
        } catch (error) {
            console.error('Error fetching fabrica from backend:', error);
        }
    };

    // Función para obtener el galtonBoardId utilizando el fabricaId
    const getGaltonBoardIdByFabricaId = async (fabricaId) => {
        try {
            const response = await api.get(`/fabricas/${fabricaId}/galtonboard`); // Usa 'api' y ajusta la ruta
            if (response.data && response.data.id) {
                return response.data.id;
            } else {
                console.error('No se pudo obtener el galtonBoardId para la fábrica:', fabricaId);
            }
        } catch (error) {
            console.error('Error fetching galtonBoardId from backend:', error);
        }
        return null;
    };

    const startSimulation = () => {
        if (simulationStarted) return;
        setSimulationStarted(true);

        const engine = engineRef.current;
        const world = engine.world;

        let ballCount = 0;
        const maxBalls = 100;
        const dropInterval = 100;

        const intervalId = setInterval(() => {
            if (ballCount >= maxBalls) {
                clearInterval(intervalId);
                return;
            }
            const ball = Matter.Bodies.circle(offsetX, offsetY - 50, ballRadius, {
                restitution: 0.5,
                friction: 0.005,
                label: 'Ball',
                render: {
                    fillStyle: '#ff66b2', // Color vibrante (rosa) para las bolas
                    strokeStyle: '#ff3399', // Borde un poco más oscuro
                    lineWidth: 2, // Grosor del borde
                    shadowBlur: 10, // Sombra difusa más fuerte para dar un efecto de brillo
                    shadowColor: '#ff99cc' // Color de la sombra
                },
            });
            Matter.World.add(world, ball);
            ballCount++;
        }, dropInterval);

        const fetchDistributionFromBackend = async (galtonBoardId) => {
            try {
                const response = await axios.post(`/api/galtonboard/mostrarDistribucion?galtonBoardId=${galtonBoardId}`);
                setDistribution(response.data);
                onSimulationFinish(response.data); // Llama al callback con la distribución
            } catch (error) {
                console.error('Error fetching distribution from backend:', error);
            }
        };

        const handleCollision = (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if (
                    (bodyA.label === 'Ball' && bodyB.label.startsWith('Container')) ||
                    (bodyB.label === 'Ball' && bodyA.label.startsWith('Container'))
                ) {
                    const ball = bodyA.label === 'Ball' ? bodyA : bodyB;
                    Matter.World.remove(world, ball);
                }
            });
        };

        Matter.Events.on(engine, 'collisionStart', handleCollision);

        const cleanup = () => {
            clearInterval(intervalId);
            Matter.Events.off(engine, 'collisionStart', handleCollision);
            setSimulationFinished(true);

            if (galtonBoardId) {
                fetchDistributionFromBackend(galtonBoardId);
            } else {
                console.error('No galtonBoardId available.');
            }
        };

        setTimeout(cleanup, maxBalls * dropInterval + 5000);
    };

    return (
        <div className="galton-board-container">
            <div className="galton-board-left">
                {!simulationStarted && (
                    <button
                        className="galton-board-button"
                        onClick={startSimulation}
                        disabled={!galtonBoardId}
                    >
                        {galtonBoardId ? 'Iniciar producción' : 'Cargando...'}
                    </button>
                )}
                <div ref={sceneRef} className="galton-board-scene" />
                {/* Mostrar solo los números debajo de cada contenedor */}
                {simulationFinished && distribution && (
                    <div className="galton-board-distribution">
                        {Object.keys(distribution)
                            .sort((a, b) => {
                                const numA = parseInt(a.replace('contenedor_', ''));
                                const numB = parseInt(b.replace('contenedor_', ''));
                                return numA - numB;
                            })
                            .map((key, index) => (
                                <div
                                    key={index}
                                    className="galton-board-distribution-number"
                                >
                                    {distribution[key]}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            {/* Sección para mostrar el Galton Board del backend */}
            {simulationFinished && distribution && (
                <div className="galton-board-backend">
                    <BackendGaltonBoard distribution={distribution} />
                </div>
            )}
        </div>
    );
};

export default GaltonBoard;