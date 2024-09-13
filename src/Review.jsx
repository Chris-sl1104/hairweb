import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery'; // Import useMediaQuery for responsive design

export default function Review() {
    const [isExpanded, setIsExpanded] = useState(false); // State to control text expansion
    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle text expansion state
    };

    // Use useMediaQuery to handle responsiveness
    const isSmallScreen = useMediaQuery('(max-width:960px)'); // Define small screen as less than 960px

    // Determine layout direction based on screen size and text expansion state
    const direction = isSmallScreen || isExpanded ? 'column' : 'row';

    // Define setMaxWidth function
    const setMaxWidth = (isSmallScreen, { boxDirection }) => {
        if (boxDirection === 'left') {
            if (isSmallScreen) {
                return '100%'; // On small screens, take full width
            } else {
                return '50%'; // On larger screens, take 50% width
            }
        } else {
            if (isSmallScreen) {
                return '90%'; // On small screens, take 90% width
            } else {
                return '75%'; // On larger screens, take 75% width
            }
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                backgroundImage: `url(src/Shampoo.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '50px 0px', sm: '80px 0px' },
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Semi-transparent overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 0,
                }}
            />
            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'white',
                    marginRight: { xs: '0', md: '5%' },
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem', lg: '8rem' },
                        marginBottom: '1vh',
                    }}
                >
                    Voices of Distinction
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: '5vh',
                        fontSize: { xs: '1rem', md: '2rem', lg: '3rem' },
                        fontWeight: { sm: 200, md: 300 },
                    }}
                >
                    Reviews That Speak for Themselves
                </Typography>

                {/* Content section */}
                <Grid
                    container
                    spacing={5}
                    direction={direction}  // Dynamically set direction based on state
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        width: '100%',
                        zIndex: 1,
                        padding: isSmallScreen ? '0 5vh' : '0', // Add padding on small screens to prevent content touching screen edges
                        paddingRight: { xs: '5vw', sm: '3vw', md: '0vw' }, // Only add right padding on small screens
                        transition: 'all 0.5s ease', // Add smooth transition for layout changes
                    }}
                >

                    {/* Left section */}
                    <Grid item xs={12} md={4}> {/* Set xs={12} and md={6} to take 50% width on large screens */}
                        <Box
                            sx={{
                                transition: 'all 0.5s ease',
                                padding: '6%',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                                borderRadius: '8px',
                                minHeight: {sm: '23vh',md: "30vh"}, // Ensure consistent initial height

                                minWidth: {sm: '30vw', md: '20vw'},

                                display: 'flex',
                                maxWidth: setMaxWidth(isSmallScreen, { boxDirection: "left" }),
                                margin: 'auto',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'black',
                                    textAlign: 'center',
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    marginBottom: '3px',
                                }}
                            >
                                Google Reviews
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'black',
                                    textAlign: 'center',
                                    fontWeight: 'normal',
                                    fontSize: { xs: '1.3rem', md: '1.5rem' },
                                }}
                            >
                                5.0 / 5.0
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: '#000000',
                                    color: 'white',
                                    padding: '10px 10px',
                                    borderRadius: '4px',
                                    marginBottom: {sm: 1, md: 0},
                                    maxWidth: '80%',
                                    width: '90%',
                                    boxSizing: 'border-box',
                                    alignSelf: 'center',
                                }}
                            >
                                VIEW
                            </Button>
                        </Box>
                    </Grid>

                    {/* Right section */}
                    <Grid item xs={12} md={6}> {/* Set xs={12} and md={6} for responsive layout */}
                        <Box
                            sx={{
                                transition: 'all 0.5s ease',
                                padding: '6%',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                minHeight: {sm: '23vh',md: "30vh"}, // Ensure consistent initial height
                                maxHeight: isExpanded ? '1000px' : '150px', // Control initial height
                                maxWidth: setMaxWidth(isSmallScreen, { boxDirection: "right" }),
                                margin: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignSelf: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                                justifyContent: 'center',
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    transition: 'all 0.5s ease',
                                    color: 'black',
                                    textAlign: 'center',
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    marginBottom: '5px',
                                    marginTop: '5px',
                                }}
                            >
                                Latest Reviews
                            </Typography>
                            <Box sx={{ maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        transition: 'all 0.5s ease',
                                        color: 'black',
                                        textAlign: 'center',
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                        overflow: 'hidden', // Hide overflowing content
                                        textOverflow: 'ellipsis', // Add ellipsis for overflowed text
                                        display: '-webkit-box',
                                        WebkitLineClamp: isExpanded ? 'none' : 2, // Show only 2 lines, expand fully on toggle
                                        WebkitBoxOrient: 'vertical',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    "Best hair salon in town, highly recommended! This is a place where you can enjoy a great atmosphere, professional service, and walk out feeling amazing. Their attention to detail is second to none."
                                </Typography>

                                {/* View More / View Less button */}
                                <Button onClick={toggleExpand}
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            backgroundColor: '#000000',
                                            color: 'white',
                                            padding: '10px 10px',
                                            borderRadius: '4px',
                                            marginBottom: 1,
                                            maxWidth: '80%',
                                            width: '90%',
                                            boxSizing: 'border-box',
                                        }}>
                                    {isExpanded ? 'View Less' : 'View More'}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
