import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, IconButton, Container } from "@mui/material";
import { Instagram, Facebook } from "@mui/icons-material";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

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
        <Container maxWidth={false} sx={{ my: 4 }}>
            {/* Top Image */}
            <Box
                component="img"
                src="src/contact.jpeg"
                alt="Contact Banner"
                sx={{
                    width: "100vw",        // Full width for all screens
                    height: { xs: "35vh", md: "40vh" },  // Adjust height for responsiveness
                    objectFit: "cover",   // Ensure the image covers the container
                    mb: 4,                 // Bottom margin
                    margin: "0 auto",    // 保持表单居中
                }}
            />

            {/* Main Contact Section */}
            <Grid container spacing={6}>
                {/* Left Side: Contact Info */}
                <Grid item xs={12} md={6} lg={4}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body1">
                            (03) 9415 1717
                        </Typography>
                        <Typography variant="body1">
                            <a href="mailto:mail@cream.melbourne">mail@cream.melbourne</a>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Level 1, 296 Brunswick Street,
                            <br />
                            Fitzroy VIC 3065
                            <br />
                            (Enter off Johnston Street)
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <IconButton href="https://instagram.com" target="_blank">
                                <Instagram />
                            </IconButton>
                            <IconButton href="https://facebook.com" target="_blank">
                                <Facebook />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Side: Contact Form */}
                <Grid item xs={12} md={6} lg={8}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            p: { xs: 2, md: 4 },
                            boxShadow: 0,
                            borderRadius: 0,
                            backgroundColor: "#fff",
                            // maxWidth: "600px",   // 限制表单最大宽度
                            // width: { xs: "100%", sm: "80%", md: "60%" },  // 根据屏幕大小调整宽度
                            margin: "0 auto",    // 保持表单居中
                        }}
                    >

                        <Typography variant="h5" gutterBottom>
                            Send us a message
                        </Typography>

                        <TextField
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            sx={{
                                width: "100%",
                                maxWidth: { xs: "80vw", sm: "60vw", md: "40vw", lg: "35vw" }, // 根据屏幕大小调整输入框宽度
                            }}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            sx={{
                                width: "100%",
                                maxWidth: { xs: "80vw", sm: "60vw", md: "40vw", lg: "35vw" }, // 根据屏幕大小调整输入框宽度
                            }}
                        />
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
                                width: "100%",
                                maxWidth: { xs: "80vw", sm: "60vw", md: "40vw", lg: "35vw" }, // 根据屏幕大小调整输入框宽度
                            }}
                        />
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
                                width: "100%",
                                maxWidth: { xs: "80vw", sm: "60vw", md: "40vw", lg: "35vw" }, // 根据屏幕大小调整文本区域宽度
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: "100%",
                                maxWidth: {xs: "80vw", sm: "60vw", md: "40vw", lg: "35vw" },   // 根据屏幕大小调整按钮宽度
                                backgroundColor: "#000",  // 黑色背景
                                color: "#fff",            // 白色字体
                                height: "5.5vh",           // 设置按钮高度
                                '&:hover': {
                                    backgroundColor: "#333",  // 悬停时的颜色稍微变亮
                                }
                            }}
                        >
                            Send
                        </Button>


                    </Box>
                </Grid>


            </Grid>
        </Container>
    );
};

export default ContactForm;