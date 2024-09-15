import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';



export default function EmailList() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
    });

    const [formErrors, setFormErrors] = useState({}); // Used to store form error status
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks form submission status
    const [dialogOpen, setDialogOpen] = useState(false); // Controls whether the dialog is displayed
    const [dialogContent, setDialogContent] = useState(''); // Stores the content for the dialog
    const [v2Token, setV2Token] = useState(''); // Stores the reCAPTCHA v2 token

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

    // Handles form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,  // Spread operator to update form fields dynamically
            [e.target.id]: e.target.value,  // Updates the field value based on input field ID
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

            // Submit form data along with the reCAPTCHA tokens
            const response = await fetch('http://192.168.0.108:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,  // Form data: first name, last name, and email
                    recaptchaTokenV2: v2Token,  // reCAPTCHA v2 token
                    recaptchaToken: token,  // reCAPTCHA enterprise token
                    emailType: 'signupConfirmation',
                    bookingData: {},
                    message:'',
                    cartDetails: {},
                }),
            });

            if (response.ok) {
                setDialogContent('You have successfully signed up!');  // Success message on successful sign-up
                setFormData({ firstName: '', lastName: '', emailAddress: '' });  // Clear form fields after submission
            } else {
                setDialogContent('There was an issue with your signup. Please try again.');  // Error message on failure
            }
            setDialogOpen(true);  // Display dialog with the result
        } catch (error) {
            console.error('Error:', error);
            setDialogContent('There was an error processing your request.');  // General error message
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
        <Box
            sx={{
                position: 'relative',
                width: 'auto',
                height: '100vh', // Full viewport height
                backgroundImage: `url(src/emailimg.png)`, // Background image path
                backgroundSize: 'cover', // Make sure the background covers the whole container
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center', // Vertically center content
                justifyContent: 'center', // Horizontally center content on smaller screens
                padding: { xs: '0 20px', sm: '0 40px' }, // Padding adjustments for different screen sizes
                overflow: 'hidden'
            }}
        >
            {/* Semi-transparent overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black semi-transparent overlay
                    zIndex: 0,
                }}
            />

            {/* Main content */}
            <Grid
                container
                direction="column"
                alignItems="center" // Align content to center on smaller screens
                sx={{
                    zIndex: 1,
                    maxWidth: '400px', // Limit the max width of the content
                    textAlign: 'center', // Center align the text
                    color: 'white',
                    marginLeft: { xs: '0', md: '20%' }, // Center on small screens, shift right on larger screens
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '20px', // Space between title and description
                    }}
                >
                    Join our Membership
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: '40px', // Space between description and input fields
                    }}
                >
                    Subscribe with your email to stay informed with the latest news and updates
                </Typography>

                {/* First Name input field */}
                <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!formErrors.firstName} // Display error styling if there is an error
                    helperText={formErrors.firstName} // Show error message if any
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                        borderRadius: '4px',
                        marginBottom: '10px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // Responsive width
                        width: '90%',
                        boxSizing: 'border-box', // Include padding in the width
                        '& label': {
                            color: 'grey', // Default label color
                        },
                        '& label.Mui-focused': {
                            color: 'black', // Focused label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', // Default border color
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // Focused border color
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'black', // Input text color
                        },
                        '& .MuiFormHelperText-root': {
                            color: 'red', // Helper text color, especially for errors
                        },
                    }}
                />

                {/* Last Name input field */}
                <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!formErrors.lastName} // Display error styling if there is an error
                    helperText={formErrors.lastName} // Show error message if any
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                        borderRadius: '4px',
                        marginBottom: '10px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // Responsive width
                        width: '90%',
                        boxSizing: 'border-box', // Include padding in the width
                        '& label': {
                            color: 'grey', // Default label color
                        },
                        '& label.Mui-focused': {
                            color: 'black', // Focused label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', // Default border color
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // Focused border color
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'black', // Input text color
                        },
                        '& .MuiFormHelperText-root': {
                            color: 'red', // Helper text color, especially for errors
                        },
                    }}
                />

                {/* Email Address input field */}
                <TextField
                    id="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    value={formData.emailAddress}
                    onChange={handleChange}
                    error={!!formErrors.emailAddress} // Display error styling if there is an error
                    helperText={formErrors.emailAddress} // Show error message if any
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                        borderRadius: '4px',
                        marginBottom: '20px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // Responsive width
                        width: '90%',
                        boxSizing: 'border-box', // Include padding in the width
                        '& label': {
                            color: 'grey', // Default label color
                        },
                        '& label.Mui-focused': {
                            color: 'black', // Focused label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', // Default border color
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black', // Focused border color
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'black', // Input text color
                        },
                        '& .MuiFormHelperText-root': {
                            color: 'red', // Helper text color, especially for errors
                        },
                    }}
                />

                {/* reCAPTCHA Container */}
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
                        borderRadius: '4px',
                        marginBottom: '0px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // Responsive width
                        width: '90%',
                        boxSizing: 'border-box', // Include padding in the width
                        '& label.Mui-focused': {
                            color: 'black',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'black',
                            }
                        }
                    }}
                >
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
                </Box>

                {/* Submit button and loading animation */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting} // Disable button when submitting
                    sx={{
                        backgroundColor: '#000000',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' },
                        width: '90%',
                        boxSizing: 'border-box',
                        '&:disabled': {
                            backgroundColor: '#000000', // Background color for disabled state
                            color: '#fff', // Text color for disabled state
                        }
                    }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'SIGN UP'} {/* Show loading animation during submission */}
                </Button>

                {/* Privacy notice */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#ffffff', // White text
                    }}
                >
                    We safeguard your privacy
                </Typography>
            </Grid>

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
}
