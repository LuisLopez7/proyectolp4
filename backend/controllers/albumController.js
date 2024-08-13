const Album = require('../models/album');

exports.createAlbum = async (req, res) => {
  const { title, description, photos } = req.body;
  const photographer = req.user._id; // Assumes user ID is attached to the request

  try {
    const newAlbum = new Album({ title, description, photos, photographer });
    await newAlbum.save();
    res.status(201).json({ message: 'Album created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
