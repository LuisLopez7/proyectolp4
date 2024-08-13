const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.post('/create', albumController.createAlbum);

module.exports = router;
