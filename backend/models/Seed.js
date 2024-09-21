require('dotenv').config({ path: '../.env' });
const uri = process.env.MONGODB_URI;
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid'); // Import the uuid package
const Item = require('./Item'); // Import Item model


const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const Item = require('./Item');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));



// Connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Item data
const items = [
    // Shampoo
    { id: uuid(), name: 'Hydrating Shampoo', price: 12.99, image: 'https://kieuhairdesigner.com.au/backend/models/shampoo.webp', category: 'Shampoo' },
    { id: uuid(), name: 'Volumizing Shampoo', price: 14.99, image: 'https://kieuhairdesigner.com.au/backend/models/shampoo.webp', category: 'Shampoo' },
    { id: uuid(), name: 'Anti-Dandruff Shampoo', price: 16.99, image: 'https://kieuhairdesigner.com.au/backend/models/shampoo.webp', category: 'Shampoo' },

    // Conditioner
    { id: uuid(), name: 'Moisturizing Conditioner', price: 15.99, image: 'https://kieuhairdesigner.com.au/backend/models/conditioner.webp', category: 'Conditioner' },
    { id: uuid(), name: 'Leave-In Conditioner', price: 18.99, image: 'https://kieuhairdesigner.com.au/backend/models/conditioner.webp', category: 'Conditioner' },
    { id: uuid(), name: 'Repairing Conditioner', price: 17.99, image: 'https://kieuhairdesigner.com.au/backend/models/conditioner.webp', category: 'Conditioner' },

    // Hair Oil
    { id: uuid(), name: 'Argan Hair Oil', price: 9.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-oil.webp', category: 'Hair Oil' },
    { id: uuid(), name: 'Coconut Hair Oil', price: 10.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-oil.webp', category: 'Hair Oil' },
    { id: uuid(), name: 'Herbal Hair Oil', price: 11.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-oil.webp', category: 'Hair Oil' },

    // Hair Mask
    { id: uuid(), name: 'Deep Repair Hair Mask', price: 19.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-mask.webp', category: 'Hair Mask' },
    { id: uuid(), name: 'Hydrating Hair Mask', price: 22.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-mask.webp', category: 'Hair Mask' },
    { id: uuid(), name: 'Color Protect Hair Mask', price: 20.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-mask.webp', category: 'Hair Mask' },

    // Hair Styling
    { id: uuid(), name: 'Texturizing Hair Spray', price: 12.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-styling.webp', category: 'Hair Styling' },
    { id: uuid(), name: 'Curl Enhancing Mousse', price: 13.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-styling.webp', category: 'Hair Styling' },
    { id: uuid(), name: 'Heat Protectant Spray', price: 15.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-styling.webp', category: 'Hair Styling' },

    // Hair Accessories
    { id: uuid(), name: 'Wooden Hair Brush', price: 8.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-brush.jpg', category: 'Hair Accessories' },
    { id: uuid(), name: 'Velvet Scrunchies', price: 6.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-brush.jpg', category: 'Hair Accessories' },
    { id: uuid(), name: 'Hair Clips Set', price: 5.99, image: 'https://kieuhairdesigner.com.au/backend/models/hair-brush.jpg', category: 'Hair Accessories' },
];





// Insert item data into the database
const seedItems = async () => {
    try {
        // Clear existing data
        await Item.deleteMany();
        console.log('Existing items removed');

        // Insert new item data
        await Item.insertMany(items);
        console.log('Preloaded items inserted into the database');
    } catch (error) {
        console.error('Error inserting items:', error);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
};

// Run the insertion function
seedItems();
