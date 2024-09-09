import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // 用于返回服务选择页面

const Checkout = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const navigate = useNavigate();

    const handleBooking = () => {
        // 执行结算逻辑，可能包括与后端通信
        alert('Booking confirmed!');
        navigate('/'); // 完成结算后返回首页
    };

    return (
        <Box sx={{ p: 3, maxWidth: '600px', margin: '0 auto', mt: 5 }}>
            <Typography variant="h4" mb={3} fontWeight="bold">Choose Date & Time</Typography>
            <TextField
                label="Select Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 3 }}
            />
            <TextField
                label="Select Time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 3 }}
            />

            <Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
                Confirm and Pay
            </Button>
        </Box>
    );
};

export default Checkout;
