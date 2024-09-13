const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item'); // 引入 Item 模型
const User = require('./models/User'); // 引入 User 模型
const cors = require('cors');
require('dotenv').config();  // 加载 .env 文件中的环境变量
const bodyParser = require('body-parser');
const axios = require('axios'); // 使用 axios 发起 HTTP 请求
const nodemailer = require('nodemailer');

const Booking = require('./models/Booking.js');

const app = express();
const router = express.Router();

// 允许所有来源访问 API
app.use(cors());

app.use(express.json()); // 解析 JSON 请求
app.use(bodyParser.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingDB')
    .then(() => console.log('MongoDB 连接成功'))
    .catch((err) => console.error('MongoDB 连接错误:', err));


// 获取已预订的时间
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({}, { appointmentTime: 1, _id: 0 }); // 只返回预约时间
        const bookedTimes = bookings.map(booking => booking.appointmentTime); // 提取时间
        res.json(bookedTimes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booked times." });
    }
});

// POST 路由来处理预定并保存到数据库
app.post('/bookings', async (req, res) => {
    const { firstName, lastName, emailAddress, selectedServices, totalAmount, totalDuration, appointmentTime } = req.body;

    // 验证请求体中是否有必要的数据
    if (!firstName || !lastName || !emailAddress || !selectedServices || !totalAmount || !totalDuration || !appointmentTime) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // 创建一个新的预定文档
        const newBooking = new Booking({
            firstName,
            lastName,
            email:emailAddress,
            selectedServices,
            totalAmount,
            totalDuration,
            appointmentTime,
        });

        // 保存到数据库
        await newBooking.save();

        res.status(201).json({ message: 'Booking confirmed successfully', booking: newBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'An error occurred while saving the booking.' });
    }
});


// nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // 你的邮箱
        pass: process.env.EMAIL_PASS, // 邮箱密码
    },
});

// 通用邮件发送函数
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${mailOptions.to}`);
    } catch (err) {
        console.error(`Failed to send email to ${mailOptions.to}:`, err);
        throw new Error('Failed to send email');
    }
};

// 邮件发送逻辑
app.post('/send-email', async (req, res) => {
    const { firstName, lastName, emailAddress, bookingData, recaptchaToken, recaptchaTokenV2, emailType } = req.body;

    // 验证 reCAPTCHA v2 token
    try {
        const recaptchaV2Response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: process.env.RECAPTCHA_V2_SECRET_KEY,
                response: recaptchaTokenV2,
            },
        });

        if (!recaptchaV2Response.data.success) {
            return res.status(400).json({ message: 'reCAPTCHA v2 validation failed' });
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA v2:', error);
        return res.status(500).json({ message: 'Error verifying reCAPTCHA v2' });
    }

    // 验证 reCAPTCHA v3 token
    try {
        const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY, // 你的 reCAPTCHA 密钥
                response: recaptchaToken,
            },
        });

        if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
            return res.status(400).json({ message: 'Failed reCAPTCHA verification' });
        }
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error);
        return res.status(500).json({ message: 'Error verifying reCAPTCHA' });
    }

    try {
        // 根据 emailType 生成不同的邮件内容
        let mailOptionsToCustomer;
        if (emailType === 'bookingConfirmation') {
            // 从 bookingData 中提取所需信息
            const { selectedServices, totalAmount, appointmentTime } = bookingData;

            // 格式化服务信息
            const servicesList = selectedServices.map(service => `- ${service.name}: $${service.price}`).join('\n');

            // 格式化时间
            const formattedDate = new Date(appointmentTime).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            // 预定确认邮件
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,  // 使用 bookingData.email
                subject: 'Your booking is confirmed!',
                text: `Dear ${bookingData.firstName} ${bookingData.lastName},\n\n` +
                    `Your booking has been confirmed for the following services:\n\n` +
                    `${servicesList}\n\n` +
                    `Total Amount: $${totalAmount}\n\n` +
                    `Appointment Time: ${formattedDate}\n\n` +
                    `We look forward to seeing you soon.\n\n` +
                    `Thank you!\nThe Hair Salon Team`
            };
        } else if (emailType === 'signupConfirmation') {
            // 注册确认邮件
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,
                subject: 'Thank you for signing up!',
                text: `Hello ${firstName},\n\nThank you for joining our mailing list! We're excited to have you with us.\n\nBest regards,\nThe Hair Salon Team`
            };
        } else {
            // 默认邮件
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,
                subject: 'Thank you for contacting us!',
                text: `Hello ${firstName},\n\nThank you for reaching out to us. We will get back to you shortly.\n\nBest regards,\nThe Hair Salon Team`
            };
        }

        // 发送给客户
        await sendEmail(mailOptionsToCustomer);
        const { selectedServices, totalAmount, appointmentTime, totalDuration } = bookingData;
        if (emailType === 'bookingConfirmation') {
            // 仅在 emailType 是 bookingConfirmation 时处理 servicesList
            const servicesList = selectedServices.map(service => `- ${service.name}: $${service.price}`).join('\n');

            // 发送通知给老板
            const mailOptionsToOwner = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: process.env.OWNER_EMAIL, // 发送给老板的邮箱地址
                subject: `New Booking on your website!`,
                text: `A new booking has been made!\n\n` +
                    `Name: ${firstName} ${lastName}\n` +
                    `Email: ${emailAddress}\n\n` +
                    `Booking Details:\n` +
                    `Service: ${servicesList}\n\n` +  // 只有在 bookingConfirmation 时生成服务列表
                    `Total Amount: $${totalAmount}\n` +
                    `Total Duration: ${Math.floor(totalDuration / 60)} hours ${totalDuration % 60} minutes\n` + // 显示总时长
                    `Appointment Time: ${new Date(appointmentTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}\n\n` + // 格式化时间
                    `Thank you,\nThe Hair Salon Team`
            };

            await sendEmail(mailOptionsToOwner);
        } else {
            // 如果 emailType 不是 bookingConfirmation，跳过 servicesList 部分，但继续执行其他逻辑
            const mailOptionsToOwner = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: process.env.OWNER_EMAIL, // 发送给老板的邮箱地址
                subject: `New Action on your website!`,
                text: `A user has interacted with your website.\n\n` +
                    `Name: ${firstName} ${lastName}\n` +
                    `Email: ${emailAddress}\n` +
                    `Action: ${emailType}\n\n` +
                    `Thank you,\nThe Hair Salon Team`
            };

            await sendEmail(mailOptionsToOwner);
        }


        res.status(200).send('Emails sent successfully');
    } catch (err) {
        console.error('Error sending emails:', err);
        res.status(500).send('Failed to send emails');
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



// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`服务器正在运行在端口 ${PORT}`));
