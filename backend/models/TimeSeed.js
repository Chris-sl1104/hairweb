const mongoose = require('mongoose');
const Booking = require('./Booking');  // 确保路径正确

// 连接到 MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB 已连接');
        seedData();
    })
    .catch(err => {
        console.error('MongoDB 连接失败:', err);
    });

const seedData = async () => {
    try {
        // 删除现有的所有预定
        await Booking.deleteMany({});
        console.log('已清空预定数据');

        // 添加测试数据
        const bookings = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                selectedServices: ['Haircut', 'Shampoo'],
                totalAmount: 50,
                totalDuration: 60,
                appointmentTime: new Date('2024-09-20T10:00:00'),
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                selectedServices: ['Haircut'],
                totalAmount: 30,
                totalDuration: 45,
                appointmentTime: new Date('2024-09-20T11:00:00'),
            }
        ];

        await Booking.insertMany(bookings);
        console.log('预定数据已插入');
        process.exit();
    } catch (err) {
        console.error('数据插入失败:', err);
        process.exit(1);
    }
};
