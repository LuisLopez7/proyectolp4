import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const onChange = (date) => {
        setDate(date);
    };

    const addEvent = (event) => {
        event.preventDefault();
        const eventName = event.target.elements.eventName.value;
        const eventDescription = event.target.elements.eventDescription.value;
        const startTime = event.target.elements.startTime.value;
        const endTime = event.target.elements.endTime.value;
        setEvents([...events, { date, name: eventName, description: eventDescription, startTime, endTime }]);
        event.target.reset();
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
                                    <div>{event.date.toDateString()}</div>
                                    <div>{event.startTime} - {event.endTime}</div>
                                    <div>{event.description}</div>
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
