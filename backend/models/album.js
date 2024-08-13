const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
