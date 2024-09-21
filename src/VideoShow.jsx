import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTheme } from '@mui/material/styles';

export default function VideoShow() {
    const [videoPlayed, setVideoPlayed] = useState(Array(12).fill(false)); // Track play status for each video
    const videoRefs = useRef([]); // Store references to video elements
    const theme = useTheme(); // Get current theme

    // Handle image click to play the video
    const handleImageClick = (index) => {
        const updatedPlayedStatus = [...videoPlayed];
        updatedPlayedStatus[index] = true;
        setVideoPlayed(updatedPlayedStatus);
    };

    // Video URLs converted
    const videoUrls = [
        'https://drive.google.com/file/d/1mwvwTEw7SABDrO64MDkj3zI5H_n9bSfo/preview', // Google Drive video
        'https://drive.google.com/file/d/1nmSlm-cJ8KJjWD69SdNxG3MqB-Tk3Gw6/preview', // Google Drive video
        'https://drive.google.com/file/d/1suZvSdpzEAu4XoD6-c5E5q_qpzomZox7/preview', // Google Drive video
        'https://drive.google.com/file/d/1039xp1BYEarDqKxv1IPfAnmEJheE1HHY/preview', // Google Drive video
        'https://drive.google.com/file/d/15oND6fru3SwUuC_eIT7PvQoRTgqijcBv/preview', // Google Drive video
        'https://drive.google.com/file/d/1ZtnrCtQqLSQ_TFL4fW9I1n7-g2aTltiB/preview', // Google Drive video
        'https://drive.google.com/file/d/1uPOQ7_OFjKSP5J19xF8d-6a8FyXuVLov/preview', // Google Drive video
        'https://drive.google.com/file/d/1SDsNRLTqVNo4qGY_DR52YZVQCa_7GNXE/preview', // Google Drive video
        'https://drive.google.com/file/d/1e2Y_P41I8nCQ161-y1a7B9q3lHBpAHHv/preview', // Google Drive video
        'https://drive.google.com/file/d/15k_6qh24PT0FqdZWJAEnU-pDC0v5NdwD/preview', // Google Drive video
        'https://drive.google.com/file/d/1ZugAJWG4g8TFK5E8G3cSRBP0dDstj_fU/preview', // Google Drive video
        'https://drive.google.com/file/d/14SYHZBeqdBEoSWWnQCR3cbcaX2RF91-K/preview', // Google Drive video
        'https://drive.google.com/file/d/1trFQumpk9gTxY0BAsSL82hsD6tdfWgHd/preview', // Google Drive video
        'https://drive.google.com/file/d/1USLyhhasS61qR2larCYrbKWnqFNGHZZJ/preview', // Google Drive video
        'https://drive.google.com/file/d/1Gi4b_-vtN-xbHZmEPuwrZHvPNxx-xN01/preview', // Google Drive video
    ];

    // Converted Google Drive links for thumbnails
    const videoThumbnails = [
        '/img1.png',
        '/img2.png',
        '/img3.png',
        '/img4.png',
        '/img5.png',
        '/img6.png',
        '/img7.png',
        '/img8.png',
        '/img9.png',
        '/img10.png',
        '/img11.png',
        '/img12.png',
        '/img13.png',
        '/img14.png',
        '/img15.png',
    ];




    // Check if the video is a Google Drive link
    const isGoogleDriveLink = (url) => {
        return url.includes('drive.google.com');
    };

    return (
        <Box
            className="welcomeClass"
            sx={{
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography
                variant="h1"
                className="font-antic-didone"
                sx={{
                    marginBottom: { xs: '50px', md: '70px', lg: '80px' },
                    marginLeft: { xs: '15px', md: '35px', lg: '70px' },
                    marginRight: '15px',
                    fontSize: { xs: '40px', sm: '50px', md: '60px', lg: '70px' },
                    textAlign: 'left',
                    fontFamily: '"Antic Didone", serif',
                    color: theme.palette.text.primary,
                }}
            >
                <br />
                <br />
                Instagram Videos
                <br />
            </Typography>

            <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3.5, md: 5, lg: 7 } }}>
                <Grid container spacing={2}>
                    {videoUrls.map((videoUrl, index) => (
                        <Grid
                            item
                            xs={6} // Single column on small screens
                            md={4} // Two per row on medium screens
                            lg={3} // Three per row on larger screens
                            key={index}
                        >
                            <Card sx={{ width: '100%', height: '0', paddingBottom: '56.25%', position: 'relative' }}>
                                {videoPlayed[index] ? (
                                    <iframe
                                        src={videoUrl}
                                        allow="autoplay; encrypted-media"
                                        style={{
                                            border: 'none',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    ></iframe>
                                ) : (
                                    <div>
                                        <CardMedia
                                            component="img"
                                            image={videoThumbnails[index]} // Use the corresponding thumbnail from the array
                                            title="Click to Play Video"
                                            onClick={() => handleImageClick(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                cursor: 'pointer',
                                                filter: theme.palette.mode === 'dark' ? 'brightness(70%)' : 'none',
                                            }}
                                        />
                                        {/* Play icon */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 1,
                                                color: 'white',
                                                opacity: 1,
                                            }}
                                        >
                                            <PlayArrowIcon
                                                sx={{
                                                    fontSize: '3rem', // 设置更小一点的图标尺寸，使得整体按钮看起来更精致
                                                    color: 'white', // 图标的默认颜色
                                                    zIndex: 10,
                                                    position: 'relative',
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    width: '80px',
                                                    height: '80px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #FF4081, #FFC107)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
                                                    '&:hover': {
                                                        transform: 'translate(-50%, -50%) scale(1.1)',
                                                        boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.5)',
                                                    },
                                                }}
                                                onClick={() => handleImageClick(index)}
                                            >
                                                <PlayArrowIcon
                                                    sx={{
                                                        fontSize: '3rem',
                                                        color: 'white',
                                                    }}
                                                />
                                            </Box>

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
