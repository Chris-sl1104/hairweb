import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

import './Welcome.css';

export default function Welcome() {
    return (
        <Box
            className="welcomeClass"
            sx={{
                flexGrow: 1,
                padding: 2,
                backgroundColor: 'black', // Set the background color to black
                color: 'white', // Set the text color to white for visibility against the black background
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
                            fontSize: {xs: '2rem', sm: '2.5rem', md: '3.5rem'},  // Adjust font size for different screen sizes
                            fontFamily: 'Antic Didone, serif',  // Use Antic Didone font
                            fontWeight: 400,  // Set font weight to 400 (regular)
                            lineHeight: 1.4,  // Line height for readability
                            margin: {xs: "1rem", md: "2rem"}
                        }}
                    >
                        <br/> Welcome<br/><br/>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },  // Adjust font size based on screen size
                            fontFamily: 'Antic Didone, serif',  // Use Antic Didone font
                            lineHeight: 1.6,  // Increase line height for better readability
                            margin: {xs: "1rem", md: "2rem"}
                        }}
                    >
                        Welcome to Cream Melbourne! We're privileged to be situated in the heart of the bohemian
                        Fitzroy, offering you a peaceful oasis above the bustling Brunswick Street. At our salon, we
                        believe in breaking the mold when it comes to everyday styling. Our friendly team is always here
                        to ensure that your visit is unforgettable and has everyone asking, "Who did your hair?"

                        Our philosophy at Cream is to understand your individual preferences and create a stunning look
                        that complements your unique features and fits your lifestyle. We want your style to be
                        something you truly adore and feel confident managing, so you can keep returning for more.

                        We can't wait to help you achieve the perfect look that reflects your personality and makes you
                        feel fabulous!
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    overflow: 'hidden', // Ensure any overflow content is hidden
                    maxWidth: '100%', // Limit the max width of the parent container to 100% of the page width
                }}>
                    <Box
                        component="img"
                        src="src/outside.jpeg"
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
