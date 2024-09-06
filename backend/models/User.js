const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define schema for users
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Automatically generate UUID
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
    },
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
