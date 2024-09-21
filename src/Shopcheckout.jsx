import React, {useEffect, useState} from "react";
import { Grid, Box, Typography, TextField, Button, IconButton, Container, AppBar, Toolbar } from "@mui/material";
import { Instagram, Facebook, Brightness4, Brightness7 } from "@mui/icons-material";
import { Phone } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";
import Map from "./Map";
import Footer from "./Footer.jsx";
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingSpinnerWithRandomSpeed from "./LoadingSpinner.jsx";
import Divider from "@mui/material/Divider";

const ContactForm = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState({}); // Used to store form error status
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks form submission status
    const [dialogOpen, setDialogOpen] = useState(false); // Controls whether the dialog is displayed
    const [dialogContent, setDialogContent] = useState(''); // Stores the content for the dialog
    const [v2Token, setV2Token] = useState(''); // Stores the reCAPTCHA v2 token

    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);


    // Load reCAPTCHA v2 script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad";
        script.async = true;
        script.defer = true;

        // 定义全局 onload 函数，在 reCAPTCHA 脚本加载完成后调用
        window.onRecaptchaLoad = () => {
            console.log('reCAPTCHA script loaded successfully');
        };

        // 设置 reCAPTCHA v2 回调函数
        window.onRecaptchaV2Success = (token) => {
            setV2Token(token);
        };

        document.body.appendChild(script);

        return () => {
            // 清理 script 标签
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that the required fields are not empty
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format validation regex
        if (!formData.firstName) errors.firstName = 'First Name is required';  // Check if first name is empty
        if (!formData.lastName) errors.lastName = 'Last Name is required';    // Check if last name is empty
        // if (!formData.message) errors.message = 'Message is required';
        if (!formData.emailAddress) {
            errors.emailAddress = 'Email Address is required';  // Check if email is empty
        } else if (!emailRegex.test(formData.emailAddress)) {
            errors.emailAddress = 'Please enter a valid email address';  // Validate email format
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);  // If errors exist, display them
            return;
        }

        // Ensure reCAPTCHA v2 is completed
        if (!v2Token) {
            setDialogContent('Please complete the reCAPTCHA v2');  // Prompt user to complete reCAPTCHA
            setDialogOpen(true);  // Open the dialog to display the message
            return;
        }

        setFormErrors({});  // Clear any previous error messages
        setIsSubmitting(true);  // Set the submission state to true to show loading animation

        try {
            // Perform reCAPTCHA enterprise validation
            const token = await window.grecaptcha.enterprise.execute('6LfsEToqAAAAAMC8N5ActNXZ5Q6mUhywhF83ys39', { action: 'submit' });

            const cartDetails = cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: (item.price * item.quantity).toFixed(2),
            }));

            // Submit form data along with the reCAPTCHA tokens
            const response = await fetch('https://kieuhairdesigner.com.au:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,  // Form data: first name, last name, and email
                    recaptchaTokenV2: v2Token,  // reCAPTCHA v2 token
                    recaptchaToken: token,  // reCAPTCHA enterprise token
                    emailType: 'shopRequest',
                    message: formData.message,
                    cartDetails: cartDetails,
                    bookingData:{}
                }),
            });

            if (response.ok) {
                setDialogContent('Your order has been received successfully!');  // Success message on successful sign-up
                setFormData({ firstName: '', lastName: '', emailAddress: '', message: ''});  // Clear form fields after submission
            } else {
                setDialogContent('There was an issue with your online order. Please try again.');  // Error message on failure
            }
            setDialogOpen(true);  // Display dialog with the result
        } catch (error) {
            console.error('Error:', error);
            setDialogContent('There was an error processing your online order.');  // General error message
            setDialogOpen(true);  // Display dialog with error message
        } finally {
            setIsSubmitting(false);  // Reset the submission state after form handling completes
        }
    };

    // Function to close the dialog
    const handleDialogClose = () => {
        setDialogOpen(false);  // Set the dialog state to closed
    };

    return (
        <>
            {/* Full-page background color */}
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}
            >
                <Container disableGutters maxWidth={false} sx={{ padding: 0, margin: 0 }}>
                    {/* Top Image */}
                    <Box
                        sx={{
                            backgroundImage: 'url("/contact.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: { xs: "40vh", md: "45vh" },
                        }}
                    />

                    {/* Main Contact Section */}
                    <Grid container spacing={6} sx={{ margin: 0, width: "100%", padding: 4 }}>
                        {/* Left Side: Shopping Cart */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    padding: theme.spacing(2, 4),
                                    backgroundColor: theme.palette.background.paper,
                                    textAlign: "left",
                                }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                                    Your Cart
                                </Typography>
                                {cartItems.length > 0 ? (
                                    <>
                                        {cartItems.map((item) => (
                                            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography>{item.name} x {item.quantity}</Typography>
                                                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                                            </Box>
                                        ))}
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: 'right' }}>
                                            Total: ${totalAmount}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography>Your cart is empty</Typography>
                                )}
                            </Box>
                        </Grid>

                        {/* Right Side: Contact Form */}
                        <Grid item xs={12} md={6} lg={8} sx={{ padding: 0 }}>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    padding: theme.spacing(2, 4),
                                    backgroundColor: theme.palette.background.paper,
                                    maxWidth: "450px",
                                    margin: "0 auto",
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                                    Your information
                                </Typography>

                                {/* First Name Field */}
                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={!!formErrors.firstName} // Display error styling if there is an error
                                    helperText={formErrors.firstName} // Show error message if any
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        color: theme.palette.text.primary,
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />

                                {/* Last Name Field */}
                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={!!formErrors.lastName} // Display error styling if there is an error
                                    helperText={formErrors.lastName} // Show error message if any
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        color: theme.palette.text.primary,
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />

                                {/* Email Field */}
                                <TextField
                                    label="Email"
                                    name="emailAddress"
                                    variant="outlined"
                                    id="emailAddress"
                                    fullWidth
                                    required
                                    type="email"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    error={!!formErrors.emailAddress} // Display error styling if there is an error
                                    helperText={formErrors.emailAddress} // Show error message if any
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        color: theme.palette.text.primary,
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />

                                {/* Message Field */}
                                <TextField
                                    id="message"
                                    label="Additional Notes"
                                    name="message"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={!!formErrors.message} // Display error styling if there is an error
                                    helperText={formErrors.message} // Show error message if any
                                    sx={{
                                        backgroundColor: theme.palette.background.paper,
                                        color: theme.palette.text.primary,
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                />

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

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting} // Disable button when submitting
                                    sx={{
                                        fontSize : "1.1rem",
                                        backgroundColor: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000', // White in dark mode, black in light mode
                                        color: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF', // Black text in dark mode, white text in light mode
                                        "&:hover": {
                                            backgroundColor: theme.palette.mode === 'dark' ? '#E0E0E0' : '#333333', // Slightly lighter or darker on hover
                                        },
                                    }}
                                >
                                    {/* Show loading animation during submission */}
                                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'SEND'}
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
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default ContactForm;
