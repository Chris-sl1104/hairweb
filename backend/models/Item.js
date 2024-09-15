const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

// Define schema for items
const itemSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid, // Automatically generate UUID
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

// Create Item model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
