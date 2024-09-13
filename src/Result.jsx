import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 获取从 Checkout 页面传递来的数据
    const { firstName, lastName, emailAddress, selectedServices, totalAmount, totalDuration, appointmentTime } = location.state || {};

    const handleGoBack = () => {
        navigate('/'); // 返回主页
    };

    return (
        <>
            <ResponsiveAppBar />
            <Box p={3}>
                <Typography variant="h4" gutterBottom>Booking Confirmation</Typography>

                <Typography variant="h6">Personal Information</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="First Name" secondary={firstName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Last Name" secondary={lastName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email Address" secondary={emailAddress} />
                    </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Selected Services</Typography>
                <List>
                    {selectedServices && selectedServices.length > 0 ? (
                        selectedServices.map((service, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={service.name}
                                    secondary={`Price: $${service.price} | Duration: ${Math.floor(service.duration / 60)} hr ${service.duration % 60} min`}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No services selected" />
                        </ListItem>
                    )}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Appointment Details</Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Appointment Time" secondary={new Date(appointmentTime).toLocaleString()} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Total Amount" secondary={`$${totalAmount}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Total Duration" secondary={`${Math.floor(totalDuration / 60)} hr ${totalDuration % 60} min`} />
                    </ListItem>
                </List>

                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleGoBack}>
                    Go to Home
                </Button>
            </Box>
        </>

    );
};

export default Result;
