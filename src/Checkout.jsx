import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button, TextField, CircularProgress } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the date picker
import axios from 'axios';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import InfoIcon from '@mui/icons-material/Info';
import './Checkout.css';

const Checkout = () => {
    const theme = useTheme();
    const location = useLocation();
    const isDarkMode = (theme.palette.mode === 'dark');
    const { selectedServices, totalAmount, totalDuration } = location.state || {};
    const [selectedDate, setSelectedDate] = useState(null); // The appointment time selected by the user
    const [bookedTimes, setBookedTimes] = useState([]); // Already booked times
    const [dialogOpen, setDialogOpen] = useState(false); // Controls whether the dialog is displayed
    const [dialogContent, setDialogContent] = useState(''); // Stores the content for the dialog
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [loading, setLoading] = useState(true); // Loading state
    const [errorMessage, setErrorMessage] = useState(''); // Error message
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
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
                // Ensure bookedTimes is an array; if not, use an empty array
                setBookedTimes(Array.isArray(response.data) ? response.data : []);
                setLoading(false); // Data loading completed
            })
            .catch(error => {
                console.error("Error fetching booked times:", error);
                setBookedTimes([]); // Set to an empty array in case of error to prevent crashes
                setLoading(false); // Even if there's an error, stop the loading state
            });
    }, []);

    // Disable already booked times
    const isTimeBooked = (date) => {
        if (!Array.isArray(bookedTimes)) return false;
        return bookedTimes.some((bookedDate) => {
            const bookedDateTime = new Date(bookedDate).toISOString().slice(0, 16); // Accurate to the minute
            const selectedDateTime = date.toISOString().slice(0, 16); // Accurate to the minute
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
        // Validate if the user has selected a time and entered their personal information
        if (!selectedDate || !formData.firstName || !formData.lastName || !formData.email) {
            setDialogContent('Please fill in all fields and select a booking time.');  // Set the error message
            setDialogOpen(true);  // Open the dialog
            return;
        }

        // Ensure reCAPTCHA v2 is completed
        if (!v2Token) {
            setDialogContent('Please prove you are not a robot');  // Prompt the user to complete reCAPTCHA
            setDialogOpen(true);  // Open the dialog to display the message
            return;
        }

        setIsSubmitting(true); // Start submitting

        try {
            // reCAPTCHA validation
            const token = await window.grecaptcha.enterprise.execute('6LfsEToqAAAAAMC8N5ActNXZ5Q6mUhywhF83ys39', { action: 'submit' });

            // Prepare the data to be sent to the backend
            const bookingData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.email, // Use email to match the backend
                selectedServices,
                totalAmount,
                totalDuration,
                appointmentTime: selectedDate,
            };

            // Submit the booking data to the backend, saving it in the database
            const bookingResponse = await axios.post('http://192.168.0.108:5000/bookings', bookingData);

            if (bookingResponse.status === 201) {

                // After successful booking, send a confirmation email
                const emailResponse = await axios.post('http://192.168.0.108:5000/send-email', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    emailAddress: formData.email, // Use emailAddress to match the email sending logic
                    emailType: 'bookingConfirmation', // Specify the email type
                    recaptchaToken: token, // If the reCAPTCHA token is needed
                    recaptchaTokenV2: v2Token,  // reCAPTCHA v2 token
                    bookingData: bookingData,
                    message: '',
                    cartDetails:{},
                });

                if (emailResponse.status === 200) {
                    setDialogContent('Booking confirmed and confirmation email sent successfully!');
                    setDialogOpen(true);
                    navigate('/result', { state: bookingData }); // Pass the booking data
                } else {
                    setDialogContent('Booking Error, please try again!');
                    setDialogOpen(true);
                }


            }
        } catch (error) {
            console.error("Error during booking or email sending:", error);
            setErrorMessage('Please prove you are not a robot. Please try again.');
        } finally {
            setIsSubmitting(false); // End submission
        }
    };

    // Function to close the dialog
    const handleDialogClose = () => {
        setDialogOpen(false);  // Set the dialog state to closed
        setIsSubmitting(false);
    };

    return (
        <Box
            sx={{
                padding: '2rem',
                paddingTop: '6rem',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                    : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
                minWidth: "100vw",
                minHeight: "100vh",
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mr: 2, color: theme.palette.text.primary }} gutterBottom>
                    Checkout
                </Typography>
                <InfoIcon sx={{  width: '40px', height: '40px' , transform: 'translateY(-4px)' , color: isDarkMode ? '#f5f5f5' : 'rgba(0,0,0,0.64)', mr: 1 }} />
            </Box>

            {/* Display service list */}
            <List>
                {selectedServices.map((service) => (
                    <ListItem key={service.id}>
                        <ListItemText
                            primary={service.name}
                            secondary={`$${service.price} · ${Math.floor(service.duration / 60)} hr ${service.duration % 60} min`}
                            primaryTypographyProps={{ color: theme.palette.text.primary }}
                            secondaryTypographyProps={{color: theme.palette.text.secondary}}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{my: 2}}/>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>Total: ${totalAmount}</Typography>
            <Typography variant="body1" color="textSecondary">Total
                Duration: {Math.floor(totalDuration / 60)} hr {totalDuration % 60} min</Typography>

            {/* Display error message */}
            {errorMessage && <Typography color="error" sx={{my: 2}}>{errorMessage}</Typography>}

            {/* User information input fields */}
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                sx={{
                    mb: 2,
                    maxWidth: '400px',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {borderColor: '#3f51b5'},
                        '&.Mui-focused fieldset': {borderColor: '#3f51b5'},
                    },
                    mx: 'auto',
                }}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <br/>
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                sx={{
                    mb: 2,
                    maxWidth: '400px',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {borderColor: '#3f51b5'},
                        '&.Mui-focused fieldset': {borderColor: '#3f51b5'},
                    },
                    mx: 'auto',
                }}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            /><br/>
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                sx={{
                    mb: 2,
                    maxWidth: '400px',
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {borderColor: '#3f51b5'},
                        '&.Mui-focused fieldset': {borderColor: '#3f51b5'},
                    },
                    mx: 'auto',
                }}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            {/* Date picker */}
            <Typography variant="h6" gutterBottom sx={{ mt:3, color: theme.palette.text.primary }}>Select Appointment Time:</Typography>

            {loading ? (
                <CircularProgress/>
            ) : (
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    filterTime={(time) => !loading && !isTimeBooked(time)}
                    placeholderText="Select a time"
                    minDate={new Date()}
                    disabled={loading}
                    className="checkout-container"
                />
            )}

            {/* reCAPTCHA widget */}
            <Box
                sx={{
                    paddingTop:"20px",
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
            <br />

            {/* Submit button */}
            <Button
                variant="contained"
                color="warning"
                sx={{
                    mt: 2,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: '#ff8000',
                    },
                }}
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'confirm booking'}
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
