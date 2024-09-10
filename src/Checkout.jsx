import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button, TextField, CircularProgress } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 引入日期选择器的样式
import axios from 'axios';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const Checkout = () => {
    const location = useLocation();
    const { selectedServices, totalAmount, totalDuration } = location.state || {};
    const [selectedDate, setSelectedDate] = useState(null); // 用户选择的预约时间
    const [bookedTimes, setBookedTimes] = useState([]); // 已经被预约的时间
    const [dialogOpen, setDialogOpen] = useState(false); // Controls whether the dialog is displayed
    const [dialogContent, setDialogContent] = useState(''); // Stores the content for the dialog
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [loading, setLoading] = useState(true); // 加载状态
    const [errorMessage, setErrorMessage] = useState(''); // 错误消息
    const [isSubmitting, setIsSubmitting] = useState(false); // 提交状态
    const [v2Token, setV2Token] = useState(''); // Stores the reCAPTCHA v2 token
    const navigate = useNavigate();

    // Load reCAPTCHA v2 script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Listen for the reCAPTCHA v2 completion callback
        window.onRecaptchaV2Success = (token) => {
            setV2Token(token);  // Store the received token when the reCAPTCHA is completed
        };

        return () => {
            document.body.removeChild(script);  // Cleanup the script when the component is unmounted
        };
    }, []);

    useEffect(() => {
        axios.get('/bookings')
            .then(response => {
                console.log('Booked times:', response.data);
                // 确保 bookedTimes 是一个数组，如果不是则使用空数组
                setBookedTimes(Array.isArray(response.data) ? response.data : []);
                setLoading(false); // 数据加载完成
            })
            .catch(error => {
                console.error("Error fetching booked times:", error);
                setBookedTimes([]); // 出现错误时设为空数组，避免后续操作崩溃
                setLoading(false); // 即使有错误，也需要停止 loading 状态
            });
    }, []);

    // 禁用已经被预定的时间
    const isTimeBooked = (date) => {
        if (!Array.isArray(bookedTimes)) return false;
        return bookedTimes.some((bookedDate) => {
            const bookedDateTime = new Date(bookedDate).toISOString().slice(0, 16); // 精确到分钟
            const selectedDateTime = date.toISOString().slice(0, 16); // 精确到分钟
            return bookedDateTime === selectedDateTime;
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleConfirmBooking = async () => {
        // 验证用户是否选择了时间和输入了个人信息
        if (!selectedDate || !formData.firstName || !formData.lastName || !formData.email) {
            setDialogContent('Please fill in all fields and select a booking time.');  // 设置错误消息
            setDialogOpen(true);  // 打开弹窗
            return;
        }

        // Ensure reCAPTCHA v2 is completed
        if (!v2Token) {
            setDialogContent('Please prove you are not a robot');  // Prompt user to complete reCAPTCHA
            setDialogOpen(true);  // Open the dialog to display the message
            return;
        }

        setIsSubmitting(true); // 开始提交

        try {
            // reCAPTCHA 验证
            const token = await window.grecaptcha.enterprise.execute('6LfsEToqAAAAAMC8N5ActNXZ5Q6mUhywhF83ys39', { action: 'submit' });

            // 准备要发送给后端的数据
            const bookingData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.email, // 使用email与后端保持一致
                selectedServices,
                totalAmount,
                totalDuration,
                appointmentTime: selectedDate,
            };

            // 提交预定数据到后端，保存到数据库
            const bookingResponse = await axios.post('http://192.168.0.108:5000/bookings', bookingData);

            if (bookingResponse.status === 201) {

                // 预定成功后发送确认邮件
                const emailResponse = await axios.post('http://192.168.0.108:5000/send-email', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    emailAddress: formData.email, // 使用emailAddress与邮件发送逻辑匹配
                    emailType: 'bookingConfirmation', // 指定邮件类型
                    recaptchaToken: token, // 如果需要 reCAPTCHA token
                    recaptchaTokenV2: v2Token,  // reCAPTCHA v2 token
                    bookingData: bookingData,
                });

                if (emailResponse.status === 200) {
                    setDialogContent('Booking confirmed and confirmation email sent successfully!');
                    setDialogOpen(true);
                    navigate('/result', { state: bookingData }); // 传递预定数据
                } else {
                    setDialogContent('Booking Error, please try again!');
                    setDialogOpen(true);
                }


            }
        } catch (error) {
            console.error("Error during booking or email sending:", error);
            setErrorMessage('Please prove you are not a robot. Please try again.');
        } finally {
            setIsSubmitting(false); // 结束提交
        }
    };

    // Function to close the dialog
    const handleDialogClose = () => {
        setDialogOpen(false);  // Set the dialog state to closed
        setIsSubmitting(false);

    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Checkout</Typography>

            {/* 显示服务列表 */}
            <List>
                {selectedServices.map((service) => (
                    <ListItem key={service.id}>
                        <ListItemText
                            primary={service.name}
                            secondary={`$${service.price} · ${Math.floor(service.duration / 60)} hr ${service.duration % 60} min`}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: ${totalAmount}</Typography>
            <Typography variant="body1" color="textSecondary">Total Duration: {Math.floor(totalDuration / 60)} hr {totalDuration % 60} min</Typography>

            {/* 显示错误消息 */}
            {errorMessage && <Typography color="error" sx={{ my: 2 }}>{errorMessage}</Typography>}

            {/* 用户信息输入框 */}
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            {/* 日期选择器 */}
            <Typography variant="h6" gutterBottom>Select Appointment Time</Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    filterTime={(time) => !loading && !isTimeBooked(time)} // 当数据加载完成时才过滤时间
                    placeholderText="Select a time"
                    minDate={new Date()} // 禁止选择今天之前的日期
                    disabled={loading} // 加载期间禁用选择器
                />
            )}
            {/* reCAPTCHA widget */}
            <Box
                sx={{
                    display: 'inline-block',
                    maxWidth: '100%', // Ensure reCAPTCHA does not exceed container width
                }}
            >
                <div
                    className="g-recaptcha"
                    data-sitekey="6LcPYzoqAAAAANByR-t19h3vZImim9wQH7gVQLy0"
                    data-callback="onRecaptchaV2Success"
                    style={{
                        transform: 'scale(0.80)',  // Scale down the reCAPTCHA widget
                        transformOrigin: '0 0',   // Scale from the top-left corner
                    }}
                ></div>
            </Box>

            {/* 提交按钮 */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleConfirmBooking}
                disabled={isSubmitting} // 提交时禁用按钮
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'SIGN UP'} {/* Show loading animation during submission */}
            </Button>
            {/* Dialog component for notifications */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Checkout;
