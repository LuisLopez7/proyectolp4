const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');

router.get('/', eventosController.getEvents);
router.post('/', eventosController.createEvent);
router.delete('/:id', eventosController.deleteEvent);

module.exports = router;
