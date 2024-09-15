import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, MenuItem, Slide, useMediaQuery  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/themeSlice'; // Import toggleTheme action
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Day icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Night icon
import ShoppingCart from './ShoppingCart'; // Shopping cart component
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const ResponsiveAppBar = () => {



    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isDarkMode = useSelector((state) => state.theme.mode === 'dark'); // Get theme mode from Redux
    const dispatch = useDispatch(); // Dispatch for toggling theme mode

    const handleOpenNavMenu = () => {
        console.log("Opening menu");
        setMenuOpen(true); // Open menu
    };

    const handleCloseNavMenu = () => {
        console.log("Closing menu");
        setMenuOpen(false); // Close menu
    };

    const isMobile = useMediaQuery('(min-width:1000px)');
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
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
                            fontWeight: 400,
                            letterSpacing: '0rem',
                            color: theme.palette.text.primary,
                            textDecoration: 'none',
                            textAlign: 'left',
                            fontSize: {
                                xs: '1.2rem',
                                sm: '1.3rem',
                                md: '1.4rem',
                            },
                        }}
                    >
                        Kieu's Hair Salon
                    </Typography>

                    {/* Display navigation items on larger screens */}
                    {isMobile && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {['Home', 'Shopping', 'Services', 'Booking', 'Contact', 'FAQ'].map((page) => (
                                <Button
                                    key={page}
                                    component={Link}
                                    to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: theme.palette.text.primary,
                                        display: 'block',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Menu button (visible on smaller screens) */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex'}}>
                            <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} sx={{ color: isDarkMode ? 'white' : 'black' }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    )}


                    {/* Theme toggle button */}
                    <IconButton
                        sx={{ ml: 1, color: isDarkMode ? 'white' : 'black' }}
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                    <IconButton
                        sx={{ ml: 1, color: isDarkMode ? 'white' : 'black' }}
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {isDarkMode ? (
                            <ToggleOnIcon sx={{ fontSize: '45px' }} />
                        ) : (
                            <ToggleOffIcon sx={{ fontSize: '45px' }} />
                        )}
                    </IconButton>

                    {/* ShoppingCart */}
                    <ShoppingCart />
                </Toolbar>
            </AppBar>

            {/* Fullscreen Menu with Slide Animation */}
            <Slide direction="down" in={menuOpen} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backdropFilter: 'blur(10px)',
                        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        color: isDarkMode ? 'white' : 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        margin: 0,
                        zIndex: 1300,
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                    }}
                >
                    {/* Menu Items */}
                    {['Home', 'Shopping', 'Services', 'Booking', 'Contact', 'FAQ'].map((page) => (
                        <MenuItem
                            key={page}
                            component={Link}
                            to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
                            onClick={handleCloseNavMenu}
                            sx={{ fontSize: '1.5rem', margin: '1rem' }}
                        >
                            {page}
                        </MenuItem>
                    ))}

                    {/* Close button */}
                    <IconButton
                        onClick={handleCloseNavMenu}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: isDarkMode ? 'white' : 'black',
                        }}
                    >
                        <CloseIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </Box>
            </Slide>
        </>
    );
};

export default ResponsiveAppBar;
