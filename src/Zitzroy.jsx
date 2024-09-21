import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Zitzroy() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%', // set to the viewport width
                height: {xs: "50vh", sm: '60vh', md: "70vh"}, // set to 60% of the full screen height
                backgroundImage: `url(/Fitzroy.jpg)`, // background image path
                backgroundSize: 'cover', // background image covers the entire container
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center', // Center content vertically
                justifyContent: 'center', // Center content horizontally
                padding: { xs: '0 20px', sm: '0 40px' }, // Set different padding for small and large screens
                overflow: 'hidden',
                boxSizing: 'border-box', // Make sure padding does not cause content to overflow
            }}
        >
            {/* Translucent mask */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black translucent mask
                    zIndex: 0,
                }}
            />

            {/* Content section */}
            <Grid
                container
                direction="column"
                alignItems="center" // Center the content for small screens
                sx={{
                    zIndex: 1,
                    textAlign: 'center', // Center the text
                    color: 'white',
                    marginRight: { xs: '0', md: '5%' }, // Center for small screens, right for large screens
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '6rem', xm: "7rem", md: '9rem', lg: "11rem"}, // Adjust font size according to screen size
                        marginBottom: '20px', // Spacing with description text
                    }}
                >
                    FITZROY
                </Typography>

                <Typography
                    variant="h3" // Default variant
                    sx={{
                        marginBottom: '40px',
                        fontSize: { xs: '2rem', md: '3rem', lg: "4rem"}, // Adjust font size according to screen size
                        fontWeight: { xm: 200, md: 300 }, // Adjust font weight according to screen size
                    }}
                >
                    Proudly Rooted Since 1998
                </Typography>

            </Grid>
        </Box>
    );
}