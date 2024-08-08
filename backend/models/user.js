const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema para el modelo User
const userSchema = new Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },  
    username: { type: String, required: true },  
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },  
    resetPasswordToken: String, 
    resetPasswordExpires: Date, 
    profilePicture: { type: String, default: 'default-profile-picture.jpg' } 
});

// Exporta el modelo User
module.exports = mongoose.model('user', userSchema);
