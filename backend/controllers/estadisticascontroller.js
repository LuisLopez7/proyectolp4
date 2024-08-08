const Estadisticas = require('../models/Estadisticas');

exports.obtenerEstadisticas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ message: 'Las fechas de inicio y fin son requeridas' });
        }

        const estadisticas = await Estadisticas.find({
            createdAt: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        });

        if (!estadisticas.length) {
            return res.status(404).json({ message: 'No se encontraron estadísticas para el rango de fechas proporcionado' });
        }

        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas', error });
    }
};



exports.actualizarEstadisticas = async (req, res) => {
    const { userId } = req.params;
    const { vistas, likes, comentarios, fecha } = req.body;

    try {
        const estadisticas = new Estadisticas({ userId, vistas, likes, comentarios, fecha });
        await estadisticas.save();

        res.status(201).json({ message: 'Estadísticas actualizadas', estadisticas });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estadísticas', error });
    }
};

  
