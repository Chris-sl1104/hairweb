import React, { useEffect, useRef, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function MainPage() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null); // Reference to the video element

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
                    src="src/coverVideoPlaceholder.png" // Path to the placeholder image
                    alt="Loading Placeholder"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                        zIndex: 0,
                        transform: isMobile ? 'none' : 'rotate(90deg) scaleX(-1)',
                    }}
                />
            )}

            {/* Video element */}
            <Box
                component="video"
                ref={videoRef} // Get the video element through ref
                src="src/coverVideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoaded}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: isMobile ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) rotate(90deg) scaleX(-1)',
                    width: isMobile ? '100vw' : '100vh',
                    height: isMobile ? '100vh' : '100vw',
                    objectFit: 'cover',
                    zIndex: 1,
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            />

            {/* Semi-transparent overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                        Hair Salon
                    </Box>
                    <Box component="span" sx={{ display: { sx: 'block', md: 'inline' } }}>
                        @Fitzroy
                    </Box>
                </Typography>

                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{
                            marginRight: 2,
                            background: 'linear-gradient(45deg, #FF4081, #FF80AB)',
                            boxShadow: '0px 4px 15px rgba(255, 64, 129, 0.5)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0px 6px 20px rgba(255, 64, 129, 0.7)',
                            },
                        }}
                        onClick={() => navigate('/booking')}
                    >
                        Book Now
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        sx={{
                            backgroundColor: 'white',
                            color: '#FF4081',
                            border: '2px solid #FF4081',
                            boxShadow: '0px 4px 15px rgba(255, 64, 129, 0.5)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0px 6px 20px rgba(255, 64, 129, 0.7)',
                            },
                        }}
                    >
                        View More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
