import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Divider, Paper } from '@mui/material';
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import {useTheme} from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingSpinnerWithRandomSpeed from './LoadingSpinner';


const Result = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Stop the loading animation after 3 seconds

        return () => clearTimeout(timer); // Clear the timer
    }, []);

    if (loading) {
        return <LoadingSpinnerWithRandomSpeed />;
    }

    // Get the data passed from the Checkout page
    const { firstName, lastName, emailAddress, selectedServices, totalAmount, totalDuration, appointmentTime } = location.state || {};

    const handleGoBack = () => {
        navigate('/'); // Return to home page
    };

    return (
        <Box sx={{background: theme.palette.mode === 'dark'
                ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
            minWidth: "100vw",
            minHeight: "100vh",}}>
            <ResponsiveAppBar />
            <Box p={3} sx={{ maxWidth: '800px', margin: 'auto', paddingTop: "7rem", minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: theme.palette.primary.main, paddingBottom: 3 }}>
                        Booking Confirmation
                    </Typography>
                    <CheckCircleIcon
                        sx={{
                            transform: 'translateY(-16px)',
                            width: '50px',
                            height: '50px',
                            color: theme.palette.success.main, // Use .main to get the primary color
                            marginLeft: 2 // Add some spacing to separate the icon and the text
                        }}
                    />
                </Box>


                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Personal Information
                    </Typography>
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
                </Paper>

                <Divider sx={{ my: 2 }} />

                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Selected Services
                    </Typography>
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
                </Paper>

                <Divider sx={{ my: 2 }} />

                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Appointment Details
                    </Typography>
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
                </Paper>

                <Button
                    variant="contained"
                    color="warning"
                    sx={{ mt: 2, display: 'block', width: '100%' }}
                    onClick={handleGoBack}
                >
                    Go to Home
                </Button>
            </Box>
        </Box>
    );
};

export default Result;
