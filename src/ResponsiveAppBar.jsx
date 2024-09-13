import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles'; // Correct import for useTheme
import { keyframes } from '@mui/system';
import ShoppingCart from './ShoppingCart';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
`;

const pages = ['Home', 'Services', 'shopping', 'Booking', 'Contact'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';  // 检测当前是否为深色模式

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // 动态设置字体颜色
    const fontColor = isDarkMode ? 'white' : 'white';  // 根据模式变化字体颜色

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: isDarkMode
                    ? 'rgba(0,0,0,0.6)'   // 深色模式下的背景颜色透明度
                    : 'rgba(0,0,0,0.64)',  // 浅色模式下的背景颜色透明度
                transition: 'background-color 0.3s ease',
                boxShadow: 'none',  // 不显示阴影
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ minHeight: '64px' }}> {/* 设置导航栏高度为 64px */}
                {/* Left-side logo */}
                <Typography
                    variant="h6"
                    component="a"
                    href="/"
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        letterSpacing: '0.02rem',
                        color: "white",  // 动态设置字体颜色
                        textDecoration: 'none',
                        textAlign: 'left',
                        fontSize: {
                            xs: '1.2rem',
                            sm: '1.4rem',
                            md: '1.6rem',
                        },
                    }}
                >
                    Kieu's Hair Salon
                </Typography>

                {/* Display navigation items on larger screens */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            component={Link}  // Use Link for internal navigation
                            to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}  // Set "/" for "Home", lowercase for others
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: fontColor,  // Dynamically set text color
                                display: 'block',
                                fontSize: '1rem',
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                {/* Menu button (visible on smaller screens) */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} sx={{ color: fontColor }}>
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',  // Fullscreen menu for mobile devices
                            animation: `${fadeIn} 0.5s ease`,
                            '& .MuiPaper-root': {
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '20px',
                            },
                        }}
                    >
                        {/* Close button for menu */}
                        <IconButton onClick={handleCloseNavMenu} sx={{ alignSelf: 'flex-end', color: 'white' }}>
                            <CloseIcon sx={{ fontSize: 40, animation: `${slideDown} 0.5s ease` }} />
                        </IconButton>

                        {/* Navigation items for mobile view */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, flexGrow: 1 }}>
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ width: '100%', animation: `${fadeIn} 0.8s ease` }}>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            color: 'white',
                                            fontSize: '2rem',
                                            padding: '10px 0',
                                            '&:hover': {
                                                color: '#f50057',
                                                transform: 'scale(1.1)',
                                                transition: 'transform 0.2s ease-in-out',
                                            },
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Box>

                        {/* Social media icons */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5 }}>
                            <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white' }}>
                                <InstagramIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                        </Box>
                    </Menu>
                </Box>

                <ShoppingCart />
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
