import React, { useEffect, useRef, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';



export default function MainPage() {
    const version = Date.now();
    const theme = useTheme();
    function isDarkMode() {
        const theme = useTheme(); // Access the current theme
        return theme.palette.mode === 'dark'; // Returns true if the theme mode is 'dark', false otherwise
    }
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null); // Reference to the video element
    const darkMode = isDarkMode();

    // Function to be called when the video has finished loading
    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    };

    // useEffect to try playing the video automatically when the component mounts
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = true; // Ensure the video is muted
            videoElement.play().catch((error) => {
                console.error("Autoplay was prevented:", error);
                // Handle the failure of autoplay
            });
        }
    }, []);

    const navigate = useNavigate();

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
            {/* Placeholder image, displayed while the video is loading */}
            {!isVideoLoaded && (
                <Box
                    component="img"
                    src={isMobile ? `/coverVideoPlaceholder.png?v=${version}` : `/coverDesktopPlaceholder.png?v=${version}`} // Path to the placeholder image with version to avoid cache
                    alt="Loading Placeholder"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                        zIndex: 0,
                        transform: 'none',
                    }}
                />
            )}

            {/* Video or placeholder based on device type */}
            {isMobile ? (
                // If it is mobile, show the image
                <Box
                    component="img"
                    src={`/coverVideoPlaceholder.png?v=${version}`} // Mobile placeholder image with version
                    alt="Mobile Placeholder"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                // If it is desktop, show the video
                <Box
                    component="video"
                    ref={videoRef} // Get the video element through ref
                    src={`/coverVideo.mp4?v=${version}`} // Video source with version to avoid cache
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={handleVideoLoaded}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(90deg) scaleX(-1)',
                        width: '100vh',
                        height: '100vw',
                        objectFit: 'cover',
                        zIndex: 1,
                        opacity: isVideoLoaded ? 1 : 0,
                    }}
                />
            )}


            {/* Semi-transparent overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.4)'
                        : 'rgba(0, 0, 0, 0)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />


            {/* Central content */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    zIndex: 3,
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        marginBottom: 2,
                        fontSize: { xs: '2.5rem', sm: '4.2rem', md: '4.2rem', lg: '4.5rem' },
                    }}
                >
                    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                        HairDesign
                    </Box>
                    <Box component="span" sx={{ display: { sx: 'block', md: 'inline' } }}>
                        @Fitzroy
                    </Box>
                </Typography>
                <br />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row', // Column layout on mobile, row layout on desktop
                        justifyContent: 'center',
                        PaddingTop: 4,
                        alignItems: 'center',
                        gap: 2, // Button spacing
                        flexWrap: 'wrap', // Ensures responsiveness on smaller screens
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px 30px',
                            fontSize: '16px',
                            borderRadius: '30px',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.7)',
                            },
                        }}
                        onClick={() => navigate('/shopping')}
                    >
                        Shop Now
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: '2px solid black',
                            padding: '10px 30px',
                            fontSize: '16px',
                            borderRadius: '30px',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.7)',
                            },
                        }}
                        onClick={() => navigate('/services')}
                    >
                        Service Menu
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px 30px',
                            fontSize: '16px',
                            borderRadius: '30px',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.7)',
                            },
                        }}
                        onClick={() => navigate('/booking')}
                    >
                        Book Now
                    </Button>
                </Box>
                {/* About This Website's Developer */}
                {10  && (<Typography
                    variant="body1"
                    sx={{
                        marginTop: 4,
                        color: 'white',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        transform: isMobile ? 'translateY(100px)' : 'none',
                        '&:hover': {
                            transform: isMobile ? 'translateY(100px) scale(1.1)':'scale(1.1)',
                        },
                    }}
                    onClick={() => navigate('/developer-info')}
                >
                    About This Website's Developer
                </Typography>)}






            </Box>
        </Box>
    );
}
