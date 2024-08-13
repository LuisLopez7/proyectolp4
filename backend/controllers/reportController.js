const Report = require('../models/report');

exports.reportContent = async (req, res) => {
  const { contentId, contentType, reason } = req.body;
  const reporter = req.user._id; // Assumes user ID is attached to the request

  try {
    const newReport = new Report({ content: contentId, onModel: contentType, reason, reporter });
    await newReport.save();
    res.status(201).json({ message: 'Content reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
