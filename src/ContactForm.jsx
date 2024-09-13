import React, {useEffect, useState} from "react";
import { Grid, Box, Typography, TextField, Button, IconButton, Container, AppBar, Toolbar } from "@mui/material";
import { Instagram, Facebook, Brightness4, Brightness7 } from "@mui/icons-material";
import { Phone } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";
import Map from "./Map";
import Footer from "./Footer.jsx";
import LoadingSpinnerWithRandomSpeed from "./LoadingSpinner.jsx";

const ContactForm = ({ mode, toggleMode }) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Stop the loading animation after 3 seconds

        return () => clearTimeout(timer); // Clear the timer
    }, []);

    if (loading) {
        return <LoadingSpinnerWithRandomSpeed />;
    }




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
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
                            backgroundImage: 'url("src/contact.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: { xs: "40vh", md: "45vh" },
                        }}
                    />

                    {/* Main Contact Section */}
                    <Grid container spacing={6} sx={{ margin: 0, width: "100%", padding: 4 }}>
                        {/* Left Side: Contact Info */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    padding: theme.spacing(2, 4),
                                    backgroundColor: theme.palette.background.paper,
                                    textAlign: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h3" gutterBottom>
                                    Contact Us
                                </Typography>
                                <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                                    <Phone sx={{ marginRight: 1 }} />
                                    0493 551 300
                                </Typography>
                                <Typography variant="h6">
                                    <a href="mailto:iece.chris@gmail.com">iece.chris@gmail.com</a>
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    33 Rose Street,
                                    <br />
                                    Fitzroy VIC 3065
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <IconButton href="https://instagram.com" target="_blank">
                                        <Instagram sx={{ fontSize: 50, color: theme.palette.text.primary }} />
                                    </IconButton>
                                    <IconButton href="https://facebook.com" target="_blank">
                                        <Facebook sx={{ fontSize: 50, color: theme.palette.text.primary }} />
                                    </IconButton>
                                </Box>
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
                                    Send us a message
                                </Typography>

                                {/* First Name Field */}
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
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
                                    label="Last Name"
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
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
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    label="Message"
                                    name="message"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
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

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000', // White in dark mode, black in light mode
                                        color: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF', // Black text in dark mode, white text in light mode
                                        "&:hover": {
                                            backgroundColor: theme.palette.mode === 'dark' ? '#E0E0E0' : '#333333', // Slightly lighter or darker on hover
                                        },
                                    }}
                                >
                                    Send
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Map/>
            <Footer />
        </>
    );
};

export default ContactForm;
