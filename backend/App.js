const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item'); // 引入 Item 模型
const User = require('./models/User'); // 引入 User 模型
const cors = require('cors');
require('dotenv').config();  // 加载 .env 文件中的环境变量

const app = express();

// 允许所有来源访问 API
app.use(cors());

app.use(express.json()); // 解析 JSON 请求

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingDB')
    .then(() => console.log('MongoDB 连接成功'))
    .catch((err) => console.error('MongoDB 连接错误:', err));


// 添加新商品
app.post('/items', async (req, res) => {
    const { name, price, image } = req.body;
    try {
        const newItem = new Item({ name, price, image });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: '添加商品失败', error });
    }
});

// 获取 API Key 并通过 API 返回
app.get('/api/get-maps-api-key', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;  // 从环境变量获取 API Key
    res.json({ apiKey });
});

// 获取所有商品
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: '获取商品失败', error });
    }
});

// 添加新用户
app.post('/users', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const newUser = new User({ firstName, lastName, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: '添加用户失败', error });
    }
});

// 获取所有用户
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: '获取用户失败', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`服务器正在运行在端口 ${PORT}`));

