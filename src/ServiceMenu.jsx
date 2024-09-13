import React, { useState, useRef } from "react";
import { Tabs, Tab, Box, Typography, Container, IconButton, Divider } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";

// 分类和服务数据
const services = {
    women: [
        { name: "Haircut", price: "From $35"},
        { name: "Wash & Blowdry", price: "From $40"},
        { name: "Wash, Cut & Blowdry", price: "From $55"},
        { name: "Treatment", price: "From $40"},
        { name: "Colour", price: "From $65"},
        { name: "Cut & Colour", price: "From $90"},
        { name: "Half Head Foils", price: "From $90"},
        { name: "Full Head Foils", price: "From $180"},
        { name: "Perm", price: "From $120"},
        { name: "Digital Curling", price: "From $200"},
        { name: "Permanent Straightening", price: "From $200"},
    ],
    mens: [
        { name: "Cut", price: "From $30"},
        { name: "Buzz Cut", price: "From $20"},
        { name: "Fade", price: "From $45"},
        { name: "Wash & Cut", price: "From $50"},
        { name: "Colour", price: "From $70"},
        { name: "Cut & Colour", price: "From $70"},
        { name: "Cap Highlights", price: "From $90"},
        { name: "Digital Curling", price: "From $150"},
    ],
    waxing: [
        { name: "Eyebrows", price: "From $20"},
        { name: "Lip & Chin", price: "From $20"},
        { name: "Underarm", price: "From $25"},
        { name: "Full Face", price: "From $45"},
        { name: "Half Arm", price: "From $30"},
        { name: "Full Arm", price: "From $40"},
        { name: "Half Leg", price: "From $30"},
        { name: "Full Leg", price: "From $45"},
        { name: "Brazilian", price: "From $50"},
        { name: "Bikini", price: "From $40"},
    ],
    nails: [
        { name: "Manicure w Colour", price: "From $25"},
        { name: "Pedicure w Colour", price: "From $35"},
        { name: "Both w Colour", price: "From $55"},
        { name: "Manicure w Shellac", price: "From $35"},
        { name: "Pedicure w Shellac", price: "From $45"},
        { name: "Both w Shellac", price: "From $75"},
        { name: "Pedicure Natural Extra", price: "From $25"},
    ],
    sns: [
        { name: "SNS Overlay", price: "From $45"},
        { name: "SNS Full Set w Tips", price: "From $50"},
        { name: "SNS Full Set w French", price: "From $55"},
        { name: "SNS Pedicure", price: "From $55"},
        { name: "SNS Refills", price: "From $45"},
        { name: "SNS Full Set (Pink & White)", price: "From $60"},
    ],
    acrylic: [
        { name: "Acrylic Full Set w Colour", price: "From $50"},
        { name: "Acrylic Full Set w French", price: "From $55"},
        { name: "Acrylic Full Set w Shellac", price: "From $55"},
        { name: "Acrylic Full Set w Pedicure", price: "From $55"},
        { name: "Acrylic Refills", price: "From $40"},
        { name: "Soak Removal", price: "From $20"},
    ],
    other:[
        { name: "Kids Cut", price: "From $25"},
        { name: "Eyebrow Tint", price: "From $20"},
        { name: "Eyelash Tint", price: "From $20"},
        { name: "Hair Extensions (Consultation)", price: "$280 to $400"},
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
    const [selectedTab, setSelectedTab] = useState("women"); // Updated default tab to 'women'

    const tabsRef = useRef(null); // 用来引用 Tabs 组件

    // 处理 tab 的切换
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue); // Update selectedTab with the new value
    };

    // 点击左右按钮控制 Tabs 滑动
    const handleScroll = (direction) => {
        const container = tabsRef.current;
        if (container) {
            const scrollAmount = direction === "left" ? -150 : 150;
            container.scrollLeft += scrollAmount; // 直接使用 scrollLeft 来调整滚动
        }
    };

    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="md" sx={{ paddingBottom: 4 }}>
                {/* 标题 */}
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', letterSpacing: '0.1rem', marginTop: 4 }}
                >
                    SERVICE MENU
                </Typography>

                {/* 包含左右箭头的 Tabs 容器 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    {/* 左箭头按钮 */}
                    <IconButton
                        onClick={() => handleScroll("left")}
                        sx={{
                            marginRight: 1,
                            backgroundColor: '#f1f1f1',
                            borderRadius: '50%',
                            padding: '8px',
                            '&:hover': { backgroundColor: '#ddd' }
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    {/* 分类标签 */}
                    <Box
                        ref={tabsRef} // 引用 Tabs 容器
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
                            variant="scrollable" // 允许左右滑动
                            scrollButtons={false} // 不使用默认滚动按钮
                            aria-label="Service categories"
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                flexGrow: 1,
                                minHeight: '48px',
                                display: 'flex',
                            }}
                        >
                            <Tab label="WOMEN" value="women" /> {/* Changed to 'women' */}
                            <Tab label="MENS" value="mens" /> {/* Changed to 'mens' */}
                            <Tab label="WAXING" value="waxing" />
                            <Tab label="NAILS" value="nails" />
                            <Tab label="SNS" value="sns" />
                            <Tab label="ACRYLIC" value="acrylic" />
                            <Tab label="OTHER SERVICES" value="other" />
                        </Tabs>
                    </Box>

                    {/* 右箭头按钮 */}
                    <IconButton
                        onClick={() => handleScroll("right")}
                        sx={{
                            marginLeft: 1,
                            backgroundColor: '#f1f1f1',
                            borderRadius: '50%',
                            padding: '8px',
                            '&:hover': { backgroundColor: '#ddd' }
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>

                {/* 当前分类的名字 */}
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        marginBottom: 3,
                        fontWeight: 'bold',
                        letterSpacing: '0.08rem',
                        color: '#333',
                    }}
                >
                    {tabLabels[selectedTab]} {/* 显示当前选中的分类 */}
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                {/* 显示当前分类下的服务项目 */}
                <Box>
                    {services[selectedTab].map((service, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                backgroundColor: '#f5f5f5',
                                padding: 2,
                                marginBottom: 2,
                                borderRadius: '8px',
                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                {service.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#666' }}>
                                {service.price}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </>

    );
};

export default ServiceMenu;
