const eventos = require('../models/eventos');

exports.getEvents = async (req, res) => {
    try {
        const events = await eventos.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const newEvent = new eventos(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await eventos.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted', event: deletedEvent });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err });
    }
};
