import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook for theme-based styling
import "./Welcome.css"

export default function About2() {
    const theme = useTheme(); // Access MUI theme

    return (
        <Box
            className="welcomeClass"
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                justifyContent: 'center',
                minHeight: '40vh',
                margin: 0,
                padding: 0,
                backgroundColor: theme.palette.background.default, // Dynamic background color based on theme
                color: theme.palette.text.primary, // Dynamic text color based on theme
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
                            margin: { xs: "1rem", md: "2rem" }
                        }}
                    >
                        <Typography
                            variant="h2"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                textAlign: { xs: 'center', md: 'left' }, // Center alignment for small screens, left alignment for larger screens
                                color: theme.palette.text.primary, // Dynamic text color
                            }}
                        >
                            Style, Crafted to Perfection
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            margin: { xs: "1rem", md: "2rem" }
                        }}
                    >
                        <Typography
                            variant="h5"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                textAlign: { xs: 'center', md: 'left' }, // Center alignment for small screens, left alignment for larger screens
                                color: theme.palette.text.secondary, // Dynamic secondary text color
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
