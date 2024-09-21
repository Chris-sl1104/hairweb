const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item'); // Import Item model
const User = require('./models/User'); // Import User model
const cors = require('cors');
require('dotenv').config(); // Load environment variables in .env file
const bodyParser = require('body-parser');
const axios = require('axios'); // Use axios to make HTTP requests
const nodemailer = require('nodemailer');
const Booking = require('./models/Booking.js');
const app = express();
const router = express.Router();
const fs = require('fs');
const https = require('https');

// Allow all sources to access the API
app.use(express.json()); // Parse JSON request
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB 连接成功'))
    .catch((err) => console.error('MongoDB 连接错误:', err));

app.use(cors({
    origin: 'https://kieuhairdesigner.com.au',
    methods: ['GET', 'POST'],
    credentials: true
}));

// Get the booked time
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({}, { appointmentTime: 1, _id: 0 }); // 只返回预约时间
        const bookedTimes = bookings.map(booking => booking.appointmentTime); // 提取时间
        res.json(bookedTimes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booked times." });
    }
});

// POST route to process the reservation and save it to the database
app.post('/bookings', async (req, res) => {
    const { firstName, lastName, emailAddress, selectedServices, totalAmount, totalDuration, appointmentTime } = req.body;

    // Verify that the request body contains necessary data
    if (!firstName || !lastName || !emailAddress || !selectedServices || !totalAmount || !totalDuration || !appointmentTime) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        // Create a new booking document
        const newBooking = new Booking({
            firstName,
            lastName,
            email:emailAddress,
            selectedServices,
            totalAmount,
            totalDuration,
            appointmentTime,
        });

        // Save to database
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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generic mail sending function
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${mailOptions.to}`);
    } catch (err) {
        console.error(`Failed to send email to ${mailOptions.to}:`, err);
        throw new Error('Failed to send email');
    }
};

// Email sending logic
app.post('/send-email', async (req, res) => {
    const { firstName,
        lastName,
        emailAddress,
        bookingData,
        recaptchaToken,
        recaptchaTokenV2,
        emailType,
        cartDetails,
        message
    } = req.body;

    // Verify reCAPTCHA v2 token
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

    // Verify reCAPTCHA v3 token
    try {
        const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY, // reCAPTCHA Key
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
        // Generate different email content according to emailType
        let mailOptionsToCustomer;
        if (emailType === 'bookingConfirmation') {
            // Extract the required information from bookingData
            const { selectedServices, totalAmount, appointmentTime } = bookingData;

            // Formatting service information
            const servicesList = selectedServices.map(service => `- ${service.name}: $${service.price}`).join('\n');

            // Formatting time
            const formattedDate = new Date(appointmentTime).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            // Booking confirmation email
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,  // Using bookingData.email
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
            // Registration confirmation email
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,
                subject: 'Thank you for signing up!',
                text: `Hello ${firstName},\n\nThank you for joining our mailing list! We're excited to have you with us.\n\nBest regards,\nThe Hair Salon Team`
            };
        } else if (emailType === 'sendMessage') {
            // Client message
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,
                subject: 'Thank you for your message!',
                text: `Hello ${firstName},\n\nThank you for your message! We have received that and we will get back to you as soon as possible\n\nBest regards,\nThe Hair Salon Team`
            };
        } else if (emailType === 'shopRequest') {
            // 构建购物车产品信息字符串
            let cartDetailsText = '';
            if (cartDetails && cartDetails.length > 0) {
                cartDetails.forEach((item, index) => {
                    cartDetailsText += `${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price}, Total: $${item.total}\n`;
                });
            } else {
                cartDetailsText = 'No items in the cart.\n';
            }
            // 计算购物车总金额
            const totalAmount = cartDetails.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

            // Shopping Confirmation message
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,
                subject: 'Thank You for Your Purchase!',
                text: `Dear ${firstName},\n\nThank you for shopping with us at The Hair Salon! 
We have successfully received your order and it is now being processed. Here is a summary of your purchase:\n\n
${cartDetailsText}\n
Total Amount: $${totalAmount}\n\n
If you have any questions or need further assistance, 
please don't hesitate to contact us.\n\n
Thank you for choosing The Hair Salon, and we look forward to serving you again!\n\n
Warm regards,\nThe Hair Salon Team`
            };
        } else {
            // Default Email
            mailOptionsToCustomer = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: emailAddress,
                subject: 'Thank you for contacting us!',
                text: `Hello ${firstName},\n\nThank you for reaching out to us. We will get back to you shortly.\n\nBest regards,\nThe Hair Salon Team`
            };
        }

        // Send to customers
        await sendEmail(mailOptionsToCustomer);
        const { selectedServices, totalAmount, appointmentTime, totalDuration } = bookingData;
        if (emailType === 'bookingConfirmation') {
            // Only process servicesList if emailType is bookingConfirmation
            const servicesList = selectedServices.map(service => `- ${service.name}: $${service.price}`).join('\n');

            // Send a notification to your boss
            const mailOptionsToOwner = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: process.env.OWNER_EMAIL,
                subject: `New Booking on your website!`,
                text: `A new booking has been made!\n\n` +
                    `Name: ${firstName} ${lastName}\n` +
                    `Email: ${emailAddress}\n\n` +
                    `Booking Details:\n` +
                    `Service: ${servicesList}\n\n` +  // Generate service list only when bookingConfirmation is called
                    `Total Amount: $${totalAmount}\n` +
                    `Total Duration: ${Math.floor(totalDuration / 60)} hours ${totalDuration % 60} minutes\n` + // 显示总时长
                    `Appointment Time: ${new Date(appointmentTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}\n\n` + // 格式化时间
                    `Thank you,\nThe Hair Salon Team`
            };

            await sendEmail(mailOptionsToOwner);
        } else if(emailType === 'sendMessage') {
            const mailOptionsToOwner = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: process.env.OWNER_EMAIL,
                subject: `New Message from your Customer!`,
                text: `A user has left a message on your website.\n\n` +
                    `Name: ${firstName} ${lastName}\n` +
                    `Email: ${emailAddress}\n` +
                    `Action: ${emailType}\n\n` +
                    `The customer has left a message: \n\n"${message}".\n\n` +
                    `If you wish to reply, please reply to customer's email: ${emailAddress}.\n\n` +
                    `Thank you,\nThe Hair Salon Team`
            };

            await sendEmail(mailOptionsToOwner);
        } else if (emailType === 'shopRequest') {
            // 构建购物车产品信息字符串
            let cartDetailsText = '';
            if (cartDetails && cartDetails.length > 0) {
                cartDetails.forEach((item, index) => {
                    cartDetailsText += `${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price}, Total: $${item.total}\n`;
                });
            } else {
                cartDetailsText = 'No items in the cart.\n';
            }
            // 计算购物车总金额
            const totalAmount = cartDetails.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
            const messageText = message ? `The customer also left an Additional Note: "${message}".\n\n` : 'The customer did not leave any additional notes.\n\n';
            // 邮件选项，发送给店主
            const mailOptionsToOwner = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: process.env.OWNER_EMAIL,
                subject: `New Message from your Customer!`,
                text: `A user has left a message on your website.\n\n` +
                    `Name: ${firstName} ${lastName}\n` +
                    `Email: ${emailAddress}\n` +
                    `Action: ${emailType}\n\n` +
                    `The customer has purchased the following products:\n\n` +
                    `${cartDetailsText}\n` +  // 添加购物车详情
                    `Total Amount: $${totalAmount}\n\n` +  // 添加总金额
                    `${messageText}".\n\n` +
                    `If you wish to reply, please reply to customer's email: ${emailAddress}.\n\n` +
                    `Thank you,\nThe Hair Salon Team`
            };

            await sendEmail(mailOptionsToOwner);
        }
        else {
            // If emailType is not bookingConfirmation,
            // skip the servicesList part but continue to execute other logic
            const mailOptionsToOwner = {
                from: `The Hair Salon Team <${process.env.EMAIL_USER}>`,
                to: process.env.OWNER_EMAIL,
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



// Get API Key and return by API
app.get('/api/get-maps-api-key', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;  // Get the API Key from the environment variable
    res.json({ apiKey });
});

// Get all the goods
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: '获取商品失败', error });
    }
});




const sslOptions = {
    key: fs.readFileSync('/home/ec2-user/hairweb/hairweb/backend/certs/privkey.pem'),
    cert: fs.readFileSync('/home/ec2-user/hairweb/hairweb/backend/certs/fullchain.pem')
};

// 配置 HTTPS 服务器
const PORT = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`The server is running on HTTPS port ${PORT}`);
});