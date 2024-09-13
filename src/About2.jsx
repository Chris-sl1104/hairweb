import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import "./Welcome.css"

export default function About2() {
    return (
        <Box
            className="welcomeClass"
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                justifyContent: 'center',
                minHeight: '40vh',
                margin: 0,      // Ensures there is no external margin
                padding: 0,
            }}
        >
            <Grid
                container
                spacing={0}
                direction={{ xs: 'column', md: 'row' }} // Vertical layout for small screens, horizontal for larger screens
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
                                textAlign: { xs: 'center', md: 'left' }, // Center alignment for small screens, left alignment for larger screens
                            }}
                        >
                            Style, Crafted to Perfection
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            margin: {xs: "1rem", md: "2rem"}
                        }}>

                        <Typography
                            variant="h5"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                textAlign: { xs: 'center', md: 'left' }, // Center alignment for small screens, left alignment for larger screens
                            }}
                        >
                            At Kieu's Hair Salon in Fitzroy, we don’t just follow trends—we create them.
                            Our expert stylists craft personalized looks that make a statement,
                            ensuring you leave feeling confident and refreshed. Whether you're after a bold change or a subtle update,
                            we’re here to help you stand out with style.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
