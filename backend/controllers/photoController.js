const multer = require('multer');
const path = require('path');
const Photo = require('../models/Photo'); // Asegúrate de que la ruta al modelo sea correcta

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configuración del middleware de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Solo se permiten archivos de imágenes');
    }
  }
});

// Controlador para subir una fotografía
exports.uploadPhoto = async (req, res) => {
  const { title, description, tags } = req.body;
  const photographer = req.user._id; // Asegúrate de que el ID del usuario esté en la solicitud

  try {
    const newPhoto = new Photo({
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl: `/uploads/${req.file.filename}`,
      photographer
    });

    await newPhoto.save();
    res.status(201).json({ message: 'Foto subida exitosamente', photo: newPhoto });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Controlador para dar "me gusta" a una fotografía
exports.likePhoto = async (req, res) => {
  const { photoId } = req.body;
  const userId = req.user._id;

  try {
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }

    const likedIndex = photo.likes.indexOf(userId);

    if (likedIndex === -1) {
      // Si no ha dado like, lo agregamos
      photo.likes.push(userId);
    } else {
      // Si ya ha dado like, lo quitamos
      photo.likes.splice(likedIndex, 1);
    }

    await photo.save();
    res.status(200).json({ message: 'Like actualizado', likes: photo.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Controlador para buscar fotos por etiquetas
exports.searchPhotosByTags = async (req, res) => {
  const { tags } = req.query;

  try {
    const photos = await Photo.find({ tags: { $in: tags.split(',').map(tag => tag.trim()) } });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Controlador para obtener las fotos del feed
exports.getFeedPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate('photographer', 'username profilePicture').sort({ date: -1 });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = { upload, uploadPhoto, likePhoto, searchPhotosByTags, getFeedPhotos };




