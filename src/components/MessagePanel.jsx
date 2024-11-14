// src/components/MessagePanel.jsx
import React, { useState, useEffect } from 'react';

const MessagePanel = () => {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 10;

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/api/messages/recibidos'); // URL del endpoint

        eventSource.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        eventSource.onerror = (error) => {
            console.error("Error en el flujo de mensajes de RabbitMQ:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    // Lógica para la paginación
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    const totalPages = Math.ceil(messages.length / messagesPerPage);

    return (
        <div className="rabbitmq-messages">
            <div className="message-panel">
                {currentMessages.map((message, index) => (
                    <div key={index} className="message-cell">
                        {message}
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MessagePanel;
