// src/components/EventList.jsx
import React from 'react';
import '../styles/event.css';

function EventList({ eventos }) {
    return (
        <div className="event-list">
            <ul>
                {eventos.map(evento => (
                    <li key={evento.id}>
                        {evento.mensaje} - Valor: {evento.valor}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
