import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the theme

export default function Welcome() {
    const theme = useTheme(); // Access the current theme

    return (
        <Box
            className="welcomeClass"
            sx={{
                flexGrow: 1,
                padding: 2,
                backgroundColor: theme.palette.background.default, // Dynamic background color based on theme
                color: theme.palette.text.primary, // Dynamic text color based on theme
            }}
        >
            <Grid
                container
                spacing={2}
                direction={{ xs: 'column', sm: 'column', md: 'row' }} // Column layout for small screens, row layout for medium and larger screens
                alignItems="center"
            >
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h2"
                        component="h2"
                        className="font-antic-didone"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },  // Adjust font size for different screen sizes
                            fontFamily: 'Antic Didone, serif',  // Use Antic Didone font
                            fontWeight: 400,  // Set font weight to 400 (regular)
                            lineHeight: 1.4,  // Line height for readability
                            margin: { xs: "1rem", md: "2rem" },
                            color: theme.palette.text.primary, // Dynamic text color based on theme
                        }}
                    >
                        <br /> Welcome<br /><br />
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },  // Adjust font size based on screen size
                            fontFamily: 'Antic Didone, serif',  // Use Antic Didone font
                            lineHeight: 1.6,  // Increase line height for better readability
                            margin: { xs: "1rem", md: "2rem" },
                            color: theme.palette.text.primary, // Use secondary text color for better contrast
                        }}
                    >
                        Welcome to Kieu's Hair Salon! Nestled in the vibrant heart of Fitzroy,
                        we take pride in offering a serene escape from the lively streets below.
                        At Kieu's, we believe that great hair is about more than just style—it’s about expression, confidence,
                        and individuality. Our passionate team is dedicated to understanding your unique vision
                        and creating a look that highlights your natural beauty and complements your lifestyle.
                        Whether it’s a fresh new cut or maintaining your signature style,
                        we’re here to ensure you leave feeling your absolute best.
                        We look forward to helping you discover the perfect look that’s effortlessly you!
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    overflow: 'hidden', // Ensure any overflow content is hidden
                    maxWidth: '100%', // Limit the max width of the parent container to 100% of the page width
                }}>
                    <Box
                        component="img"
                        src="/outside.jpeg"
                        alt="Welcome"
                        sx={{
                            width: '100%',
                            height: 'cover',  // Automatically adjust height on small screens, fixed to 300px on larger screens
                            objectFit: 'cover', // Maintain aspect ratio while filling the container
                            padding: { xs: '1rem', md: '2rem' },  // Add padding around the image for different screen sizes
                            maxWidth: '100%', // Limit the image's maximum width to the container's width
                            boxSizing: 'border-box', // Include padding in the element's total width and height
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
