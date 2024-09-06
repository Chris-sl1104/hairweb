import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useState, useEffect } from 'react';
import { keyframes } from '@mui/system';
import ShoppingCart from './ShoppingCart';

// 定义动画效果
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

const pages = ['Home', 'Services', 'Portfolio', 'Contact'];

function ResponsiveAppBar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [anchorElNav, setAnchorElNav] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isTransparent = scrollPosition === 0;

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed" sx={{
            backgroundColor: isTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.8)',
            transition: 'background-color 0.3s ease',
            boxShadow: isTransparent ? 'none' : undefined,
            zIndex: (theme) => theme.zIndex.drawer + 1
        }}>
            <Toolbar>
                {/* 左侧LOGO */}
                <Typography
                    variant="h6"
                    component="a"
                    href=""
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Kieu's Hair Salon
                </Typography>

                {/* 在电脑尺寸下显示导航菜单项 */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', fontSize: '1rem' }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                {/* 菜单按钮 (移动设备下显示) */}
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
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
                        {/* 关闭按钮 */}
                        <IconButton onClick={handleCloseNavMenu} sx={{ alignSelf: 'flex-end', color: 'white' }}>
                            <CloseIcon sx={{ fontSize: 40, animation: `${slideDown} 0.5s ease` }} />
                        </IconButton>

                        {/* 菜单项 (移动设备) */}
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
                                                transition: 'transform 0.2s ease-in-out'
                                            },
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Box>

                        {/* 社交图标 */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5 }}>
                            <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white' }}>
                                <InstagramIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                        </Box>
                    </Menu>
                </Box>

                <ShoppingCart />
                {/* // 右侧购物车图标
                <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
                    <IconButton href="/cart" sx={{ color: 'white' }}>
                        <LocalGroceryStoreIcon />
                    </IconButton>
                </Box>*/}
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
