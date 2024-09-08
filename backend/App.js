const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item'); // 引入 Item 模型
const User = require('./models/User'); // 引入 User 模型
const cors = require('cors');
require('dotenv').config();  // 加载 .env 文件中的环境变量
const bodyParser = require('body-parser');
const axios = require('axios'); // 使用 axios 发起 HTTP 请求
const nodemailer = require('nodemailer');

const app = express();

// 允许所有来源访问 API
app.use(cors());

app.use(express.json()); // 解析 JSON 请求
app.use(bodyParser.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingDB')
    .then(() => console.log('MongoDB 连接成功'))
    .catch((err) => console.error('MongoDB 连接错误:', err));



// 创建 Nodemailer 传输器，连接到邮件服务器（例如 Gmail）
const transporter = nodemailer.createTransport({
    service: 'gmail', // 使用 Gmail，可以替换为其他邮件服务
    auth: {
        user: process.env.EMAIL_USER, //  Gmail 地址
        pass: process.env.EMAIL_PASS, //  Gmail 应用专用密码
    },
});

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, emailAddress } = req.body;

    // 配置发送给客户的邮件
    const mailOptionsToCustomer = {
        from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
        to: emailAddress, // 发送给客户的邮箱
        subject: 'Thank you for signing up!',
        text: `Hello ${firstName},
Thank you for joining our mailing list! We're excited to have you with us.
           
Visit us at:
Kieu's Hair Salon
33 Rose St, Fitzroy, VIC 3065
            
Phone: (03) 1234 5678
Email: info@hairsalon.com
            
Follow us on social media for updates, promotions, and more!
Instagram: @hairsalon
Facebook: facebook.com/hairsalon
            
We look forward to seeing you soon!
            
Best regards,
The Hair Salon Team
            `,
    };

    // 配置发送给老板的通知邮件
    const mailOptionsToOwner = {
        from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
        to: process.env.OWNER_EMAIL, // 发送给老板的邮箱地址
        subject: 'New user signed up!',
        text: `A new user has signed up!\n\nName: ${firstName} ${lastName}\nEmail: ${emailAddress}`,
    };

    // 发送确认邮件给客户
    try {
        await transporter.sendMail(mailOptionsToCustomer);
        console.log('Customer email sent');
    } catch (err) {
        console.error('Failed to send customer email:', err);
        return res.status(500).send('Failed to send customer email');
    }

    // 发送通知邮件给老板
    try {
        await transporter.sendMail(mailOptionsToOwner);
        console.log('Owner notification email sent');
        res.status(200).send('Emails sent successfully');
    } catch (err) {
        console.error('Failed to send owner email:', err);
        res.status(500).send('Failed to send owner email');
    }
});








































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

