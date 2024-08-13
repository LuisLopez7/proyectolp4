// photo.js
const express = require('express');
const router = express.Router();
const { upload, uploadPhoto, likePhoto, searchPhotosByTags, getFeedPhotos } = require('../controllers/photoController');

// Ruta para obtener las fotos del feed
router.get('/feed', getFeedPhotos);

// Las demás rutas...
router.post('/upload', upload.single('image'), uploadPhoto);
router.post('/like', likePhoto);
router.get('/search', searchPhotosByTags);

module.exports = router;



