const mongoose = require('mongoose');

const estadisticasSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vistas: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comentarios: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Estadisticas', estadisticasSchema);
