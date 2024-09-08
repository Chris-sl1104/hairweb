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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi
                                a sapien varius, et consequat lacus laoreet. Pellentesque habitant morbi
                                tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi
                                a sapien varius, et consequat lacus laoreet. Pellentesque habitant morbi
                                tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi
                                a sapien varius, et consequat lacus laoreet. Pellentesque habitant morbi
                                tristique senectus et netus et malesuada fames ac turpis egestas.
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
