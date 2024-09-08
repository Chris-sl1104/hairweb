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
                            Excellence is our culture.
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
                            Keeping up with the trends is not easy in today’s world.
                            But here at Cream Melbourne, it’s what we thrive on.
                            Our daily lives are spent keeping an eye on the media and the
                            street, always at the cutting edge of what is in and what is out.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
