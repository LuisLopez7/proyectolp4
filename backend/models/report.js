const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  content: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'onModel' },
  onModel: { type: String, required: true, enum: ['Photo', 'Comment'] },
  reason: { type: String, required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
