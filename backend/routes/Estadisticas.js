const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/Estadisticascontroller');

router.get('/', estadisticasController.obtenerEstadisticas);
router.post('/:userId', estadisticasController.actualizarEstadisticas);

module.exports = router;
