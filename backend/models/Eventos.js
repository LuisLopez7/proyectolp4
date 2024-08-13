const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

module.exports = mongoose.model('eventos', eventSchema);
