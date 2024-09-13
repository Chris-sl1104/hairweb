import React, { useState, useRef } from "react";
import { Tabs, Tab, Box, Typography, Container, IconButton, Divider } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import { useTheme } from "@mui/material/styles";

// 分类和服务数据
const services = {
    women: [
        { name: "Haircut", price: "From $35" },
        { name: "Wash & Blowdry", price: "From $40" },
        { name: "Wash, Cut & Blowdry", price: "From $55" },
        { name: "Treatment", price: "From $40" },
        { name: "Colour", price: "From $65" },
        { name: "Cut & Colour", price: "From $90" },
        { name: "Half Head Foils", price: "From $90" },
        { name: "Full Head Foils", price: "From $180" },
        { name: "Perm", price: "From $120" },
        { name: "Digital Curling", price: "From $200" },
        { name: "Permanent Straightening", price: "From $200" },
    ],
    mens: [
        { name: "Cut", price: "From $30" },
        { name: "Buzz Cut", price: "From $20" },
        { name: "Fade", price: "From $45" },
        { name: "Wash & Cut", price: "From $50" },
        { name: "Colour", price: "From $70" },
        { name: "Cut & Colour", price: "From $70" },
        { name: "Cap Highlights", price: "From $90" },
        { name: "Digital Curling", price: "From $150" },
    ],
    waxing: [
        { name: "Eyebrows", price: "From $20" },
        { name: "Lip & Chin", price: "From $20" },
        { name: "Underarm", price: "From $25" },
        { name: "Full Face", price: "From $45" },
        { name: "Half Arm", price: "From $30" },
        { name: "Full Arm", price: "From $40" },
        { name: "Half Leg", price: "From $30" },
        { name: "Full Leg", price: "From $45" },
        { name: "Brazilian", price: "From $50" },
        { name: "Bikini", price: "From $40" },
    ],
    nails: [
        { name: "Manicure w Colour", price: "From $25" },
        { name: "Pedicure w Colour", price: "From $35" },
        { name: "Both w Colour", price: "From $55" },
        { name: "Manicure w Shellac", price: "From $35" },
        { name: "Pedicure w Shellac", price: "From $45" },
        { name: "Both w Shellac", price: "From $75" },
        { name: "Pedicure Natural Extra", price: "From $25" },
    ],
    sns: [
        { name: "SNS Overlay", price: "From $45" },
        { name: "SNS Full Set w Tips", price: "From $50" },
        { name: "SNS Full Set w French", price: "From $55" },
        { name: "SNS Pedicure", price: "From $55" },
        { name: "SNS Refills", price: "From $45" },
        { name: "SNS Full Set (Pink & White)", price: "From $60" },
    ],
    acrylic: [
        { name: "Acrylic Full Set w Colour", price: "From $50" },
        { name: "Acrylic Full Set w French", price: "From $55" },
        { name: "Acrylic Full Set w Shellac", price: "From $55" },
        { name: "Acrylic Full Set w Pedicure", price: "From $55" },
        { name: "Acrylic Refills", price: "From $40" },
        { name: "Soak Removal", price: "From $20" },
    ],
    other: [
        { name: "Kids Cut", price: "From $25" },
        { name: "Eyebrow Tint", price: "From $20" },
        { name: "Eyelash Tint", price: "From $20" },
        { name: "Hair Extensions (Consultation)", price: "$280 to $400" },
    ]
};

// 分类名称显示
const tabLabels = {
    women: "WOMEN",
    mens: "MENS",
    waxing: "WAXING",
    nails: "NAILS",
    sns: "SNS",
    acrylic: "ACRYLIC",
    other: "OTHER SERVICES"
};

const ServiceMenu = () => {
    const [selectedTab, setSelectedTab] = useState("women");
    const tabsRef = useRef(null);
    const theme = useTheme();

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // 处理点击左箭头或右箭头时切换类别
    const handleScroll = (direction) => {
        const tabKeys = Object.keys(services); // 获取所有类别的 key（例如 "women", "mens" 等）
        const currentIndex = tabKeys.indexOf(selectedTab); // 获取当前选中 Tab 的索引
        let newIndex;

        if (direction === "left") {
            // 如果是向左滚动，切换到前一个类别，若已经是第一个则回到最后一个
            newIndex = currentIndex === 0 ? tabKeys.length - 1 : currentIndex - 1;
        } else {
            // 如果是向右滚动，切换到下一个类别，若已经是最后一个则回到第一个
            newIndex = currentIndex === tabKeys.length - 1 ? 0 : currentIndex + 1;
        }

        setSelectedTab(tabKeys[newIndex]); // 设置新的选中 Tab
    };

    return (
        <Box
            sx={{
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                    : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
                minHeight: '100vh',
                padding: '20px'
            }}
        >
            <ResponsiveAppBar />
            <Container maxWidth="md" sx={{ paddingBottom: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        letterSpacing: '0.1rem',
                        paddingTop:"5vh",
                        marginTop: 4,
                        color: theme.palette.text.primary,
                        textShadow: theme.palette.mode === 'dark'
                            ? '2px 2px 5px rgba(0, 0, 0, 0.3)'
                            : '1px 1px 3px rgba(255, 255, 255, 0.8)'
                    }}
                >
                    SERVICE MENU
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <IconButton
                        onClick={() => handleScroll("left")}
                        sx={{
                            marginRight: 1,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '50%',
                            padding: '8px',
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0px 2px 10px rgba(0, 0, 0, 0.5)'
                                : '0px 2px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <Box
                        ref={tabsRef}
                        sx={{
                            flexGrow: 1,
                            overflowX: 'auto',
                            display: 'flex',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                        }}
                    >
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="Service categories"
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{
                                backgroundColor: theme.palette.background.default,
                                borderRadius: '8px',
                                flexGrow: 1,
                                minHeight: '48px',
                                display: 'flex',
                                '& .MuiTab-root': {
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }
                            }}
                        >
                            <Tab label="WOMEN" value="women" />
                            <Tab label="MENS" value="mens" />
                            <Tab label="WAXING" value="waxing" />
                            <Tab label="NAILS" value="nails" />
                            <Tab label="SNS" value="sns" />
                            <Tab label="ACRYLIC" value="acrylic" />
                            <Tab label="OTHER SERVICES" value="other" />
                        </Tabs>
                    </Box>

                    <IconButton
                        onClick={() => handleScroll("right")}
                        sx={{
                            marginLeft: 1,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '50%',
                            padding: '8px',
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0px 2px 10px rgba(0, 0, 0, 0.5)'
                                : '0px 2px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>

                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        marginBottom: 3,
                        fontWeight: 'bold',
                        letterSpacing: '0.08rem',
                        color: theme.palette.text.primary,
                    }}
                >
                    {tabLabels[selectedTab]}
                </Typography>

                <Divider sx={{ marginBottom: 3, backgroundColor: theme.palette.divider }} />

                <Box>
                    {services[selectedTab].map((service, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                padding: 2,
                                marginBottom: 2,
                                borderRadius: '8px',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0px 4px 10px rgba(0, 0, 0, 0.5)'
                                    : '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                                }
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {service.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {service.price}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ServiceMenu;
