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

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: { xs: '50px 20px', sm: '60px 40px' },
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
            }}
        >
            {/* Main Footer Content */}
            <Grid container spacing={4} justifyContent="space-between">
                {/* Address Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#F1F1F1' }}>
                        Address
                    </Typography>
                    <Typography variant="body2">
                        <LocationOnIcon sx={{ color: '#ff0505', verticalAlign: 'middle' }} />
                        33 Rose St, Fitzroy

                        <br />
                        <a href="tel:+61394151717" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
                            (03) 9415 1717
                        </a>
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: '10px' }}>
                        <strong>ABN:</strong> 12 345 678 901
                    </Typography>
                </Grid>

                {/* Buy Now, Pay Later Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#F1F1F1' }}>
                        Buy now, pay later
                    </Typography>
                    <Typography variant="body2">
                        <a href="#" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
                            With ZipPay or Afterpay
                        </a>
                    </Typography>
                </Grid>

                {/* Questions Section */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#F1F1F1' }}>
                        Questions?
                    </Typography>
                    <Typography variant="body2">
                        <a href="#" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
                            Read our FAQ
                        </a>
                    </Typography>
                </Grid>
            </Grid>

            {/* Divider for Separation */}
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '40px 0' }} />

            {/* Acknowledgment Section */}
            <Box
                sx={{
                    marginTop: '20px',
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <Typography variant="body2" sx={{ marginBottom: '10px', color: '#E1E1E1' }}>
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
                        src="src/flag1.png"
                        alt="Aboriginal Flag"
                        style={{ width: '40px', height: '25px', marginRight: '15px' }}
                    />
                    <img
                        src="src/flag2.jpg"
                        alt="Torres Strait Islander Flag"
                        style={{ width: '40px', height: '25px' }}
                    />
                </Box>
            </Box>

            {/* Divider for Separation */}
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: '20px' }} />

            {/* Bottom Section with Social Media */}
            <Box
                sx={{
                    textAlign: 'center',
                    paddingTop: '20px',
                }}
            >
                <Typography variant="body2" sx={{ marginBottom: '10px', color: '#FFFFFF' }}>
                    Made with ❤️ in Fitzroy, Victoria
                </Typography>
                <Box>
                    {/* Social Media Icons */}
                    <IconButton href="https://instagram.com" sx={{ color: '#FFFFFF', padding: '10px' }}>
                        <InstagramIcon sx={{ fontSize: '32px' }} />
                    </IconButton>
                    <IconButton href="https://facebook.com" sx={{ color: '#FFFFFF', padding: '10px' }}>
                        <FacebookIcon sx={{ fontSize: '32px' }} />
                    </IconButton>
                    <IconButton href="https://twitter.com" sx={{ color: '#FFFFFF', padding: '10px' }}>
                        <TwitterIcon sx={{ fontSize: '32px' }} />
                    </IconButton>
                </Box>

                {/* Copyright Section */}
                <Typography variant="body2" sx={{ marginTop: '20px', color: '#AAAAAA' }}>
                    &copy; 2024 Your Company Name. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
