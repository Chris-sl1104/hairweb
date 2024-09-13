import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Box, Typography, TextField, Button, IconButton, Container, AppBar, Toolbar } from "@mui/material";
import { Instagram, Facebook, Brightness4, Brightness7 } from "@mui/icons-material";
import { Phone } from '@mui/icons-material';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    // Detect system theme preference
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // User's theme mode state
    const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

    // Toggle between dark and light modes
    const toggleMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    // Create a theme that adapts to light or dark mode
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                },
            }),
        [mode]
    );

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
        <ThemeProvider theme={theme} sx={{padding: 0}}>
            <AppBar
                position="static"
                sx={{
                    width: "100%",
                    overflowX: "hidden",
                    margin: 0,
                    padding: 0,
                    backgroundColor: mode === "light" ? "rgb(0, 0, 0)" : "rgb(0,0,0)", // 白天模式为黑色，夜晚模式为白色
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Typography variant="h6" component="div">
                        Contact Us
                    </Typography>
                    <IconButton onClick={toggleMode} color="inherit">
                        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Toolbar>
            </AppBar>


            {/* Full-page background color */}
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    padding: 0,
                    margin: 0,
                    boxSizing: "border-box", // 确保所有容器的宽高计算方式一致
                }}
            >
                <Container disableGutters maxWidth={false} sx={{
                    padding: 0, // 移除默认内边距
                    margin: 0, // 移除默认外边距
                    width: "100%",
                    maxWidth: "100%", // 确保不限制宽度
                    boxSizing: "border-box", // 确保计算方式一致
                }}>
                    {/* Top Image */}
                    <Box
                        sx={{
                            backgroundImage: 'url("src/contact.png")',
                            backgroundSize: "cover", // 确保背景图片覆盖整个区域
                            backgroundPosition: "center", // 确保图片居中
                            backgroundRepeat: "no-repeat", // 避免图片重复
                            width: "100%", // 确保背景图覆盖整个容器宽度
                            height: { xs: "35vh", md: "40vh" }, // 根据屏幕尺寸响应
                            margin: 0, // 确保没有外边距
                            padding: 0, // 确保没有内边距
                            boxSizing: "border-box", // 保持一致的盒子模型
                        }}
                    />

                    {/* Main Contact Section */}
                    <Grid container spacing={6} sx={{ margin: 0, width: "100%", padding: 4 }}>
                        {/* Left Side: Contact Info */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    maxWidth: "400px",
                                    flexDirection: "column",
                                    gap: 3,
                                    padding: theme.spacing(2, 4),
                                    boxShadow: 0,
                                    borderRadius: 0,
                                    backgroundColor: "background.paper",
                                    margin: "0 auto",
                                    textAlign: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <Typography variant="h3" gutterBottom>
                                    Contact Us
                                </Typography>
                                <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                                    <Phone sx={{ marginRight: 1 }} /> {/* 电话图标，右边添加1个单位的间距 */}
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
                                        <Instagram sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton href="https://facebook.com" target="_blank">
                                        <Facebook sx={{ fontSize: 50 }}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Side: Contact Form */}
                        <Grid item xs={12} md={6} lg={8} sx={{ padding: 0 }}>
                            <Box
                                container
                                direction="column"
                                alignItems="center"
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: "flex",
                                    maxWidth: "450px",
                                    flexDirection: "column",
                                    gap: 3,
                                    padding: theme.spacing(2, 4),
                                    boxShadow: 0,
                                    borderRadius: 0,
                                    backgroundColor: "background.paper",
                                    margin: "0 auto",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "20px",
                                    }}
                                >
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
                                        backgroundColor: theme.palette.mode === "light"
                                            ? "rgba(255, 255, 255, 0.8)"
                                            : "rgba(0, 0, 0, 0.8)",
                                        color: theme.palette.text.primary,
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        maxWidth: { xs: "75%", sm: "80%", md: "100%" },
                                        width: "100%",
                                        boxSizing: "border-box",
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                        },
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
                                        backgroundColor: theme.palette.mode === "light"
                                            ? "rgba(255, 255, 255, 0.8)"
                                            : "rgba(0, 0, 0, 0.8)",
                                        color: theme.palette.text.primary,
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        maxWidth: { xs: "75%", sm: "80%", md: "100%" },
                                        width: "100%",
                                        boxSizing: "border-box",
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                        },
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
                                        backgroundColor: theme.palette.mode === "light"
                                            ? "rgba(255, 255, 255, 0.8)"
                                            : "rgba(0, 0, 0, 0.8)",
                                        color: theme.palette.text.primary,
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        maxWidth: { xs: "75%", sm: "80%", md: "100%" },
                                        width: "100%",
                                        boxSizing: "border-box",
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                        },
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
                                        backgroundColor: theme.palette.mode === "light"
                                            ? "rgba(255, 255, 255, 0.8)"
                                            : "rgba(0, 0, 0, 0.8)",
                                        color: theme.palette.text.primary,
                                        borderRadius: "4px",
                                        marginBottom: "10px",
                                        maxWidth: { xs: "75%", sm: "80%", md: "100%" },
                                        width: "100%",
                                        boxSizing: "border-box",
                                        "& label.Mui-focused": {
                                            color: theme.palette.text.primary,
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.text.primary,
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: theme.palette.mode === "light"
                                            ? "rgb(0, 0, 0)" // 亮模式下的黑色背景
                                            : "rgba(255, 255, 255, 0.85)", // 暗模式下的白色背景
                                        color: theme.palette.mode === "light"
                                            ? "rgba(255, 255, 255, 0.87)" // 亮模式下的白色文本
                                            : "rgba(0, 0, 0, 0.87)", // 暗模式下的黑色文本
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        marginBottom: "20px",
                                        maxWidth: { xs: "75%", sm: "80%", md: "100%" },
                                        width: "100%",
                                        boxSizing: "border-box",
                                        boxShadow: theme.palette.mode === "light"
                                            ? "0px 4px 12px rgba(0, 0, 0, 0.1)" // 亮模式下的按钮阴影
                                            : "0px 4px 12px rgba(255, 255, 255, 0.1)", // 暗模式下的按钮阴影
                                        "&:hover": {
                                            backgroundColor: theme.palette.mode === "light"
                                                ? "rgb(50, 50, 50)" // 亮模式下的 hover 效果
                                                : "rgba(255, 255, 255, 1)", // 暗模式下的 hover 效果
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
        </ThemeProvider>
    );
};

export default ContactForm;