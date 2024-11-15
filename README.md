# Sistema de Monitoreo de la Maquina de Galton - FrontEnd (React Node)

# LINKS

FRONTEND: 

BACKEND: 

---

# PARTICIPANTES

- **Nombre del equipo**: Galton Board Analitics Team
- **Miembros**:
  - Jaime López Díaz
  - Nicolás Jimenez
  - Marcos García Benito

---

# CUENTAS PARA TESTEO:

-USUARIO --> **Mail: [usuario@gmail.com]** || **Nombre: [Usuario]** || **Contraseña: [a12345_679]**

-ADMINISTRADOR --> **Mail: [admin@gmail.com]** || **Nombre: [Administrador]** || **Contraseña: [a12345_67]**

---

# Galton-Board Frontend

Este proyecto consiste en el desarrollo del frontend de una aplicación **[Spring-WebFlux que se aprovecha de una BBDD reactiva concretamente MongoDB]** y solapa la coordinacion y deteccion de sucesos mediante **[RabbitMQ]** para la fascinante muestra de un Galton-Board y la caida de bolas en al mismo, además de muchas otras funcionalidades... Partimos de un homepage informativopara dar contexto sobre quien fue Sir Francis Galton, de este podemos saltar a otras dos paginas una para el registro de ususarios y otra para el loggin que vifurca las diferentes actividades en base al rol con el que inicias sesion(usuario o admin), sesion que puedes crear en una sección de registro.
Desborda a nivel estetico gracias a la muestra-visualización e interacción activa con múltiples pantallas, las cuales presentan diversas actividades. Estos sistemas han sido desarrollados mediante prácticas de reactividad, control de flujo, orientación a aspectos y monitorizacion pudiendo observar en dichas pantallas la seccion de administración con todos los mensajes que monitorizan las fabricas, las bolas, su estado en la caida, en que contenedor caen etc... 
Explotando la dinámica y la utilización transversal de los servicios necesarios planteados en el backend filtrados y monitorizados gracias al flujo, la reactividad y monitorización que trae consigo WebFlux+Reactive Mongo. Esto ha permitido optimizar el código, reduciendo su volumen y cumpliendo con la correcta confeccion de componentes, gestión y almacenamiento de bolas entre otras necesidades de dicho sistema.

La aplicación frontend se comunica con el backend para obtener el estado inicial de los datos base, a partir de los cuales se pueden trabajar las diferentes funcionalidades ofrecidas. Estos datos se reciben y actualizan permitiendo mostrar la caida de las bolas y la interacción de las mismas con el entorno y otros componentes, además del almacenamiento y graficación de las mismas, esto incluye explicaciones historico-teóricas y la gestion de los mansages monitorizados con RabbitMQ todo ello utilizando panelas y animaciones visualmente atractivas, siempre en función de los usuarios y administrador responsables de la muestra de los sucesos desarrollados en la aplicación.



## Tecnologías Utilizadas

- **React**: Framework de JavaScript para la construcción de interfaces de usuario.
- **Webpack**: Empaquetador de módulos que compila el código de React.
- **Babel**: Compilador de JavaScript que permite usar la sintaxis moderna de ES6+ y JSX.
- **Styled Components**: Para manejar estilos en componentes de React.
- **Axios**: Cliente HTTP para realizar solicitudes al backend.
- **React Router DOM**: Para manejar el enrutamiento dentro de la aplicación React.
- **Chart.js** y **React-Chartjs-2**: Cargado en el JSON por si fuese necesario.
- ** Imagenes

## Requisitos

Para ejecutar el frontend necesitas tener instalados:

- **Node.js** (versión recomendada: 14+)
- **npm** (gestor de paquetes incluido con Node.js)

## Instalación

1. Clona el repositorio del frontend en tu máquina local:

```bash
git clone https://github.com/tu-usuario/frontend-parcial-2.git
```

2. Navega al directorio del proyecto:

```bash
cd frontend-parcial-2
```

3. Instala las dependencias del proyecto::

```bash
npm install
```

4- Clona el repositorio del frontend en tu máquina local:

```bash
npm start
```

## Estructura del Proyecto

- **src/**: Contiene el código fuente del proyecto.
- **components/**: Componentes reutilizables de React, como la visualización de la distribución.
- **pages/**: Páginas principales de la aplicación muestra de todo atraés de ellas (islas-panel de dinos-registro <-- loggin).
- **services/**: Funciones para interactuar con la API, como las llamadas a Axios para obtener los datos del backend + aprobechamiento de aop.
- **App.js**: Punto de entrada principal de la aplicación React.
- **index.js**: Archivo de arranque de la aplicación que renderiza el componente raíz en el DOM.
- **Images**: Recursos aplicados para la mejora de experiencia visal.

## Relación entre Frontend y Backend

### -Backend

El sistema de monitoreo de la fábrica Gauss expone endpoints RESTful a través de controladores desarrollados en Spring WebFlux, que permiten la interacción en tiempo real entre el backend y el frontend. Estos endpoints facilitan la consulta y actualización constante sobre aspectos clave del ecosistema de producción, como el estado de las fábricas, la distribución de componentes y las simulaciones de producción. Gracias al patrón "Factory", cada tipo de máquina —distribución normal, distribución uniforme, etc.— cuenta con subtipos específicos que reflejan sus actividades únicas en el tablero visual del frontend. Por ejemplo, cuando una máquina de distribución normal completa una simulación de caída de bolas, los datos se envían y actualizan mediante la API REST, permitiendo a los administradores monitorear en tiempo real estos comportamientos específicos. 

La arquitectura del sistema, basada en Spring WebFlux y MongoDB reactivo, es capaz de manejar los complejos eventos de un entorno donde las máquinas interactúan continuamente entre sí y con su entorno. Las fábricas están organizadas por tipos de máquinas: la Fábrica A, por ejemplo, alberga exclusivamente máquinas de distribución normal, mientras que otras fábricas pueden tener diferentes configuraciones, facilitando así que las máquinas se desarrollen en ambientes acordes a sus necesidades.

MongoDB permite el almacenamiento y recuperación de datos en tiempo real para cada máquina, lo que hace posible que el sistema maneje múltiples eventos de manera eficiente. Esto es crucial cuando, por ejemplo, una máquina de distribución normal completa una simulación y sus componentes necesitan ser actualizados con los nuevos valores calculados.  Para gestionar eventos críticos en el sistema, se utiliza RabbitMQ, que envía alertas y notificaciones de manera asíncrona. Esto permite una rápida respuesta a situaciones en las que, por ejemplo, los sensores detectan un cambio alarmante en la producción o un comportamiento inusual que requiera atención inmediata. RabbitMQ permite que los controladores en el backend respondan a estos eventos sin bloquear el flujo de datos y sin interferir en las interacciones de otras máquinas. De este modo, el sistema mantiene la agilidad en situaciones de emergencia, sincronizando al instante estos eventos críticos con el frontend.  Además de los endpoints específicos, el sistema también integra servicios transversales que manejan aspectos de seguridad, validación y autenticación en cada interacción.

Estas funciones garantizan que cualquier acción sobre las fábricas y máquinas, desde la reubicación de componentes hasta la actualización de su estado de producción, esté protegida y cumpla con las políticas del sistema. Cada acceso a la API se valida, lo que garantiza que solo usuarios autorizados pueden monitorear y gestionar el sistema, proporcionando una plataforma segura y confiable para el ecosistema.

### -Frontend

El frontend, desarrollado con React, consume la API REST para obtener los datos de estado y distribución de varios usuarios y componentes del susodicho tablero(bolas,contenedores etc...) que se han creado, asignado, `monntado` y simulado transversalmente, reactivamente además de monitorizado gracias a un conjunto de prácticas de programación orientada al control y monitorización de flujo, reactividad  y aspectos. Estas prácticas se aplican antes, durante y después en los diferentes servicios según convenga, para la correcta generación, `montaje`, visualización y gestión de un Tablero de Galton por pantalla, entre otras funcionalidades.

La aplicación proporciona una interfaz de usuario con múltiples pantallas para disfrutar de diversas funcionalidades, incluyendo el registro, loggin, progreso y visualización (mediante animación) de de la caida de bolas, la muestra de datos graficados (en base a las bolas por contenedor), el registro de usuarios (creación de cuentas) y mucho más.

### -Conclusión:

Conclusión El proyecto Galton-Board Frontend es una aplicación completa que utiliza un backend Spring-WebFlux con una base de datos reactiva MongoDB y RabbitMQ para la coordinación y detección de eventos en base al contexto que se nos plantea.

El frontend alimentado por los datos optimizados en el backend ofrece una experiencia interactiva, mostrando el fascinante Galton-Board y la simulación de caída de bolas, entre otras funcionalidades. Desde una página de inicio informativa sobre Sir Francis Galton, los usuarios pueden navegar a páginas de registro e inicio de sesión. Dependiendo del rol del usuario (usuario o administrador), están disponibles diferentes actividades. El frontend destaca estéticamente con múltiples pantallas interactivas que muestran diversas actividades. Estos sistemas se desarrollan utilizando prácticas reactivas, control de flujo, programación orientada a aspectos y monitoreo. 

Los servicios backend, filtrados y monitoreados a través de WebFlux y Reactive Mongo, optimizan el código, reducen su volumen y aseguran una gestión adecuada de componentes, almacenamiento de bolas y otras necesidades del sistema.

Los datos se actualizan en tiempo real, permitiendo a los usuarios visualizar e interactuar con la simulación de caída de bolas, explicaciones histórico-teóricas y mensajes monitoreados a través de RabbitMQ. La aplicación utiliza paneles y animaciones visualmente atractivos, adaptados a las necesidades de los usuarios y administradores responsables de mostrar los eventos en la aplicación.
