const Comment = require('../models/comment');

exports.addComment = async (req, res) => {
  const { text, photoId } = req.body;
  const user = req.user._id; // Assumes user ID is attached to the request

  try {
    const newComment = new Comment({ text, user, photo: photoId });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
