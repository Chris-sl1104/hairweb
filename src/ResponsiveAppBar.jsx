// ResponsiveAppBar.jsx
import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/themeSlice'; // 导入 toggleTheme action
import Brightness4Icon from '@mui/icons-material/Brightness4'; // 日间图标
import Brightness7Icon from '@mui/icons-material/Brightness7'; // 夜间图标
import ShoppingCart from './ShoppingCart'; // 购物车组件

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const theme = useTheme();
    const isDarkMode = useSelector((state) => state.theme.mode === 'dark'); // 从 Redux 获取主题模式
    const dispatch = useDispatch(); // 用于切换主题模式的 dispatch

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.64)',
                transition: 'background-color 0.3s ease',
                boxShadow: 'none',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ minHeight: '64px' }}>
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
                        color: "white",
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
                    {['Home', 'Services', 'Shopping', 'Booking', 'Contact'].map((page) => (
                        <Button
                            key={page}
                            component={Link}
                            to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: 'white',
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
                    <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} sx={{ color: 'white' }}>
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        }}
                    >
                        {/* Close button for menu */}
                        <IconButton onClick={handleCloseNavMenu} sx={{ alignSelf: 'flex-end', color: 'white' }}>
                            <CloseIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Menu>
                </Box>

                {/* Theme toggle button */}
                <IconButton
                    sx={{ ml: 1, color: 'white' }}
                    onClick={() => dispatch(toggleTheme())} // 触发 Redux 中的 toggleTheme
                >
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                {/* ShoppingCart */}
                <ShoppingCart />
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
