import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook


export default function VideoShow() {
    const [videoPlayed, setVideoPlayed] = useState(Array(12).fill(false)); // Array to track the play status of each video
    const videoRefs = useRef([]); // Store references to video elements
    const theme = useTheme(); // Get the current theme

    const handleImageClick = (index) => {
        const updatedPlayedStatus = [...videoPlayed];
        updatedPlayedStatus[index] = true;
        setVideoPlayed(updatedPlayedStatus);

        // Wait until the video loads to enter fullscreen mode
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            videoElement.play().then(() => {
                // Ensure the video has started playing before entering fullscreen
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.mozRequestFullScreen) {
                    videoElement.mozRequestFullScreen(); // Firefox
                } else if (videoElement.webkitRequestFullscreen) {
                    videoElement.webkitRequestFullscreen(); // Chrome and Safari
                } else if (videoElement.msRequestFullscreen) {
                    videoElement.msRequestFullscreen(); // IE/Edge
                }
            }).catch((err) => {
                console.error('Error attempting to play the video:', err); // Handle any errors during video playback
            });
        }
    };

    // Example video URLs, you can replace these with actual URLs
    const videoUrls = [
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
        'src/videoplayback.mp4',
    ];

    // Placeholder image used for the video thumbnail before playing
    const placeholderImage = 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg';

    return (
        <Box className="welcomeClass"
        sx={{
            backgroundColor: theme.palette.background.default,
        }}>
            <Typography
                variant="h1"
                className="font-antic-didone"
                sx={{
                    // marginTop: { xs: '50px', md: '70px', lg: '90px' }, // Top margin adjustments for various screen sizes
                    marginBottom: {xs: '50px', md: '70px', lg: '80px'}, // Bottom margin adjustments
                    marginLeft: {xs: '15px', md: '35px'}, // Left margin adjustments
                    marginRight: '15px', // Fixed right margin
                    fontSize: {xs: '40px', sm: '50px', md: '60px', lg: '70px'}, // Responsive font sizes
                    textAlign: 'left',
                    fontFamily: '"Antic Didone", serif',
                    color: theme.palette.text.primary, // Dynamic text color based on theme

                }}
            >
                <br/><br/>Instagram Videos<br/>
            </Typography>

            <Box sx={{ flexGrow: 1, p: { xs: 1, xm: 3, md: 4, lg: 5 } }}>
                <Grid container spacing={0}>
                    {videoUrls.map((videoUrl, index) => (
                        <Grid
                            item
                            xs={6} // 2 per row on small screens
                            md={3} // 4 per row on medium and larger screens
                            key={index}
                            sx={{
                                padding: '0',
                            }}
                        >
                            <Card sx={{ width: '100%', height: '0', paddingBottom: '66.67%', position: 'relative' }}>
                                {videoPlayed[index] ? (
                                    <Box
                                        component="video"
                                        ref={(el) => (videoRefs.current[index] = el)} // Save reference to the video element
                                        src={videoUrl}
                                        controls
                                        muted
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover', // Ensure the video fills the container properly
                                        }}
                                    />
                                ) : (
                                    <div>
                                        <CardMedia
                                            component="img"
                                            image={placeholderImage}
                                            title="Click to Play Video"
                                            onClick={() => handleImageClick(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                cursor: 'pointer', // Change cursor on hover
                                                filter: theme.palette.mode === 'dark' ? 'brightness(70%)' : 'none', // Adjust brightness for dark mode
                                            }}
                                        />
                                        {/* Play icon */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)', // Center the play icon
                                                zIndex: 1, // Ensure the icon appears above the image
                                                color: 'white',
                                                opacity: 1,
                                            }}
                                        >
                                            <PlayArrowIcon
                                                sx={{
                                                    fontSize: '4rem', // Set the play icon size
                                                    opacity: 0.9, // Ensure the icon is visible but not too opaque
                                                    transition: 'all 0.3s ease', // Add a smooth transition effect
                                                    cursor: 'pointer', // Pointer cursor on hover
                                                    color: theme.palette.mode === 'dark' ? 'rgb(255,241,0)' : 'white', // Icon color based on theme
                                                    '&:hover': {
                                                        color: theme.palette.mode === 'dark' ? 'rgb(255,255,150)' : 'rgb(255,241,0)', // Change the icon color on hover based on theme
                                                        opacity: 1,
                                                    },
                                                }}
                                                onClick={() => handleImageClick(index)}
                                            />
                                        </Box>
                                    </div>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
