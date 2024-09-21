import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles'; // Use theme hook

export default function Footer() {
    const theme = useTheme(); // Access MUI theme

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.default, // Use dynamic background color
                color: theme.palette.text.primary, // Use dynamic text color
                padding: { xs: '50px 20px', sm: '60px 40px' },
                borderTop: `1px solid ${theme.palette.divider}`, // Dynamic divider color
                textAlign: 'center',
            }}
        >
            {/* Main Footer Content */}
            <Grid container spacing={4} justifyContent="space-between">
                {/* Address Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: theme.palette.text.primary }}>
                        Address
                    </Typography>
                    <Typography variant="body2">
                        <LocationOnIcon sx={{ color: theme.palette.warning.main, verticalAlign: 'middle' }} />
                        33 Rose St, Fitzroy
                        <br />
                        <a href="tel:0493551300" style={{ color: theme.palette.text.primary, textDecoration: 'underline' }}>
                            0493 551 0300
                        </a>
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: '10px' }}>
                        <strong>ABN:</strong> 77 327 899 818
                    </Typography>
                </Grid>

                {/* Buy Now, Pay Later Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: theme.palette.text.primary }}>
                        Buy now, pay later
                    </Typography>
                    <Typography variant="body2">
                        <a href="/" style={{ color: theme.palette.text.primary, textDecoration: 'underline' }}>
                            With Afterpay
                        </a>
                    </Typography>
                </Grid>

                {/* Questions Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: theme.palette.text.primary }}>
                        Questions?
                    </Typography>
                    <Typography variant="body2">
                        <a href="/faq" style={{ color: theme.palette.text.primary, textDecoration: 'underline' }}>
                            Read our FAQ
                        </a>
                    </Typography>
                </Grid>
            </Grid>

            {/* Divider for Separation */}
            <Divider sx={{ backgroundColor: theme.palette.divider, margin: '40px 0' }} />

            {/* Acknowledgment Section */}
            <Box sx={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
                <Typography variant="body2" sx={{ marginBottom: '10px', color: theme.palette.text.secondary }}>
                    We respectfully acknowledge the Wurundjeri People, and their Elders past and present,
                    who are the Traditional Owners of the land.
                </Typography>

                {/* Indigenous Flags */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10px',
                        marginBottom: '20px',
                    }}
                >
                    <img
                        src="/flag1.png"
                        alt="Aboriginal Flag"
                        style={{ width: '40px', height: '25px', marginRight: '15px' }}
                    />
                    <img
                        src="/flag2.jpg"
                        alt="Torres Strait Islander Flag"
                        style={{ width: '40px', height: '25px' }}
                    />
                </Box>
            </Box>

            {/* Divider for Separation */}
            <Divider sx={{ backgroundColor: theme.palette.divider, marginBottom: '20px' }} />

            {/* Bottom Section with Social Media */}
            <Box sx={{ textAlign: 'center', paddingTop: '20px' }}>
                <Typography variant="body2" sx={{ marginBottom: '10px', color: theme.palette.text.primary }}>
                    Made with ❤️ in Melbourne, Victoria
                </Typography>
                <Box>
                    {/* Social Media Icons */}
                    <IconButton href="https://instagram.com" sx={{ color: theme.palette.text.primary, padding: '10px' }}>
                        <InstagramIcon sx={{ fontSize: '50px' }} />
                    </IconButton>
                    <IconButton href="https://facebook.com" sx={{ color: theme.palette.text.primary, padding: '10px' }}>
                        <FacebookIcon sx={{ fontSize: '50px' }} />
                    </IconButton>
                    <IconButton href="https://twitter.com" sx={{ color: theme.palette.text.primary, padding: '10px' }}>
                        <TwitterIcon sx={{ fontSize: '50px' }} />
                    </IconButton>
                </Box>

                {/* Copyright Section */}
                <Typography variant="body2" sx={{ marginTop: '20px', color: theme.palette.text.secondary }}>
                    &copy; 2024 Hair Salon Team. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
