import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import "./Welcome.css"

export default function About() {
    return (
        <Box
            className="welcomeClass"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                margin: 0,      // Ensure there's no external margin
                padding: 0,
                /*padding: { xs: '20px', md: '40px' },*/  // Optional padding based on screen size (small screens: 20px, medium: 40px)
            }}
        >
            <Grid
                container
                spacing={0}
                direction={{ xs: 'column', md: 'row' }} // Vertical layout on small screens, horizontal on large screens
                alignItems="center"

            >
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            margin: {xs: "1rem", md: "2rem"}
                        }}>
                        <Typography

                            variant="h2"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                textAlign: { xs: 'center', md: 'left' }, // Center-align text on small screens, left-align on large screens
                            }}
                        >
                            About Us
                        </Typography>
                        <Typography
                            variant="h5"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                textAlign: { xs: 'center', md: 'left' }, // Center-align text on small screens, left-align on large screens
                            }}
                        >
                            <p>
                                At Kieu's Hair Salon, we’re more than just a place for haircuts—we’re a hub
                                of creativity and personal expression in the heart of Fitzroy. Established in
                                1998, we’ve built our reputation on delivering exceptional, tailored services that
                                go beyond the chair. Our passion lies in blending artistry with technique to
                                create looks that reflect each client's unique personality and style. Whether
                                you’re seeking a fresh transformation or maintaining your signature look, our
                                skilled team is dedicated to making you feel confident, stylish, and at home
                                with every visit.
                            </p>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%', // Ensures the Box fills the Grid item height
                            overflow: 'hidden', // Hides the part of the image that exceeds the Box
                        }}
                    >
                        <Box
                            component="img"
                            src="./src/About.jpg" // Please replace with the actual image URL
                            alt="About Us"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // Ensures the image covers the entire Box
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
