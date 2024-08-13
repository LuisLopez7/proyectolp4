import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(savedEvents);
    }, []);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const onChange = (date) => {
        setDate(date);
    };

    const addEvent = (event) => {
        event.preventDefault();
        const eventName = event.target.elements.eventName.value;
        const eventDescription = event.target.elements.eventDescription.value;
        const startTime = event.target.elements.startTime.value;
        const endTime = event.target.elements.endTime.value;

        // Validación de horas
        if (new Date(`1970-01-01T${startTime}Z`) >= new Date(`1970-01-01T${endTime}Z`)) {
            alert("La hora de inicio debe ser anterior a la hora de finalización");
            return;
        }

        // Validación de eventos duplicados
        const existingEvent = events.find(
            e => e.date.toDateString() === date.toDateString() && e.startTime === startTime && e.name === eventName
        );
        if (existingEvent) {
            alert("Ya existe un evento con el mismo nombre y hora en esta fecha");
            return;
        }

        // Agregar el nuevo evento
        setEvents([...events, { date, name: eventName, description: eventDescription, startTime, endTime }]);
        event.target.reset();
    };

    const removeEvent = (indexToRemove) => {
        const newEvents = events.filter((_, index) => index !== indexToRemove);
        setEvents(newEvents);
    };

    return (
        <div className="calendar-page">
            <h2>Eventos</h2>
            <div className="main-content">
                <div className="calendar-container">
                    <Calendar onChange={onChange} value={date} />
                </div>
                <div className="event-form-container">
                    <form onSubmit={addEvent}>
                        <input type="text" name="eventName" placeholder="Nombre del evento" required />
                        <input type="text" name="eventDescription" placeholder="Descripción del evento" required />
                        <label>Inicio:</label>
                        <input type="time" name="startTime" required />
                        <label>Final:</label>
                        <input type="time" name="endTime" required />
                        <button type="submit">Agregar Evento</button>
                    </form>
                </div>
            </div>
            <div className="event-list-container">
                <h3>Eventos Creados:</h3>
                <div className="event-list">
                    {events.length === 0 ? (
                        <p>No hay eventos</p>
                    ) : (
                        events.map((event, index) => (
                            <div className="event-card" key={index}>
                                <div className="event-card-header">{event.name}</div>
                                <div className="event-card-body">
                                    <div>{new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(event.date)}</div>
                                    <div>{event.startTime} - {event.endTime}</div>
                                    <div>{event.description}</div>
                                    <button onClick={() => removeEvent(index)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
