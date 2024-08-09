const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, 
    profilePicture: { type: String, default: 'default-profile-picture.jpg' },
    posts: [String],
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 }
});

module.exports = mongoose.model('profile', profileSchema); 
