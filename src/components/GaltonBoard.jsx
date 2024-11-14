import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const GaltonBoard = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const runnerRef = useRef(null);
    const [simulationStarted, setSimulationStarted] = useState(false);

    // Variables compartidas
    const pegRadius = 5;
    const ballRadius = 5;
    const offsetX = 400; // Centro del tablero en el eje X
    const offsetY = 100; // Offset inicial en el eje Y
    const horizontalSpacing = 50;
    const verticalSpacing = 50;
    const numberOfRows = 10; // Número de filas de clavos
    const boardWidth = 600;
    const boardHeight = 500;

    useEffect(() => {
        const engine = engineRef.current;
        const world = engine.world;

        // Configurar la gravedad
        engine.gravity.y = 1; // Valor estándar de gravedad

        // Crear el renderizador
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 800,
                height: 800, // Aumenté la altura para dar más espacio
                wireframes: false,
                background: '#ffffff',
            },
        });

        // Agregar los muros alrededor del tablero (excepto en la parte superior)
        const wallThickness = 10;

        const leftWall = Matter.Bodies.rectangle(
            offsetX - boardWidth / 2 - wallThickness / 2,
            offsetY + boardHeight / 2,
            wallThickness,
            boardHeight,
            {
                isStatic: true,
                label: 'Wall',
                render: { fillStyle: '#000000' },
            }
        );

        const rightWall = Matter.Bodies.rectangle(
            offsetX + boardWidth / 2 + wallThickness / 2,
            offsetY + boardHeight / 2,
            wallThickness,
            boardHeight,
            {
                isStatic: true,
                label: 'Wall',
                render: { fillStyle: '#000000' },
            }
        );

        const bottomWall = Matter.Bodies.rectangle(
            offsetX,
            offsetY + boardHeight + wallThickness / 2,
            boardWidth + wallThickness * 2,
            wallThickness,
            {
                isStatic: true,
                label: 'Floor',
                render: { fillStyle: '#000000' },
            }
        );

        Matter.World.add(world, [leftWall, rightWall, bottomWall]);

        // Agregar clavos en forma de pirámide
        for (let row = 0; row < numberOfRows; row++) {
            const pegsInRow = row + 1; // Incrementa el número de clavos por fila
            const rowOffset = (pegsInRow - 1) * horizontalSpacing / 2;

            for (let col = 0; col < pegsInRow; col++) {
                const x = offsetX - rowOffset + col * horizontalSpacing;
                const y = offsetY + row * verticalSpacing;

                const peg = Matter.Bodies.circle(x, y, pegRadius, {
                    isStatic: true,
                    label: 'Peg',
                    render: { fillStyle: '#000000' },
                });
                Matter.World.add(world, peg);
            }
        }

        // Agregar contenedores opacos debajo de los clavos
        const numberOfContainers = numberOfRows + 1; // Un contenedor más que el número de filas
        const containerWidth = boardWidth / numberOfContainers - 5; // Reducir el ancho para añadir separación
        const containerHeight = 100;
        const containerOffsetY = offsetY + boardHeight + containerHeight / 2 + 50; // Mover los contenedores más abajo

        for (let i = 0; i < numberOfContainers; i++) {
            const x = offsetX - boardWidth / 2 + i * (containerWidth + 5) + containerWidth / 2;
            const y = containerOffsetY;

            const container = Matter.Bodies.rectangle(x, y, containerWidth, containerHeight, {
                isStatic: true,
                label: 'Container',
                render: {
                    fillStyle: '#000000',
                },
            });
            Matter.World.add(world, container);
        }

        // Agregar un suelo invisible para evitar que las bolas caigan indefinidamente
        const invisibleFloor = Matter.Bodies.rectangle(
            offsetX,
            offsetY + boardHeight + containerHeight + 100,
            boardWidth,
            10,
            {
                isStatic: true,
                isSensor: true, // No colisiona, solo detecta
                label: 'InvisibleFloor',
            }
        );
        Matter.World.add(world, invisibleFloor);

        // Inicializar el motor y el renderizado usando Matter.Runner
        runnerRef.current = Matter.Runner.create();
        Matter.Runner.run(runnerRef.current, engine);
        Matter.Render.run(render);

        // Limpieza al desmontar el componente
        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
            Matter.Runner.stop(runnerRef.current);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    // Función para iniciar la simulación al hacer clic en el botón
    const startSimulation = () => {
        if (simulationStarted) return;
        setSimulationStarted(true);

        const engine = engineRef.current;
        const world = engine.world;

        let ballCount = 0;
        const maxBalls = 100;
        const dropInterval = 100; // Milisegundos entre cada bola

        const intervalId = setInterval(() => {
            if (ballCount >= maxBalls) {
                clearInterval(intervalId);
                return;
            }
            const ball = Matter.Bodies.circle(offsetX, offsetY - 50, ballRadius, {
                restitution: 0.5,
                friction: 0.005,
                label: 'Ball',
                render: { fillStyle: '#ff0000' },
            });
            Matter.World.add(world, ball);
            ballCount++;
        }, dropInterval);

        // Hacer desaparecer las bolas al tocar los contenedores
        const handleCollision = (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if (
                    (bodyA.label === 'Ball' && bodyB.label === 'Container') ||
                    (bodyB.label === 'Ball' && bodyA.label === 'Container')
                ) {
                    const ball = bodyA.label === 'Ball' ? bodyA : bodyB;
                    Matter.World.remove(world, ball);
                }
            });
        };

        Matter.Events.on(engine, 'collisionStart', handleCollision);

        // Limpieza cuando la simulación termine
        const cleanup = () => {
            clearInterval(intervalId);
            Matter.Events.off(engine, 'collisionStart', handleCollision);
        };

        // Configurar limpieza cuando se desmonta el componente o la simulación termina
        setTimeout(cleanup, maxBalls * dropInterval + 5000); // Espera adicional para asegurar que todas las bolas hayan caído
    };

    return (
        <div>
            {!simulationStarted && (
                <button onClick={startSimulation}>Iniciar producción</button>
            )}
            <div ref={sceneRef} />
        </div>
    );
};

export default GaltonBoard;
