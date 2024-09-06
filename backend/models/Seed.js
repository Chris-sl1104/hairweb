const mongoose = require('mongoose');
const Item = require('./Item'); // 引入 Item 模型

// 连接到数据库
mongoose.connect('mongodb://localhost:27017/shoppingDB')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));


// 商品数据
const items = [
    { name: 'Shampoo', price: 12.99, image: 'backend/models/shampoo.webp' },
    { name: 'Conditioner', price: 15.99, image: 'backend/models/conditioner.webp' },
    { name: 'Hair Oil', price: 9.99, image: 'backend/models/hair-oil.webp' },
    { name: 'Hair Brush', price: 8.99, image: 'backend/models/hair-brush.jpg' },
];

// 插入商品数据到数据库
const seedItems = async () => {
    try {
        // 清空已有数据
        await Item.deleteMany();
        console.log('Existing items removed');

        // 插入新的商品数据
        await Item.insertMany(items);
        console.log('Preloaded items inserted into the database');
    } catch (error) {
        console.error('Error inserting items:', error);
    } finally {
        mongoose.connection.close(); // 关闭数据库连接
    }
};

// 运行插入函数
seedItems();
