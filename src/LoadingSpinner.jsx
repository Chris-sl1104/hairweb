import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const LoadingSpinnerWithRandomSpeed = () => {
    const theme = useTheme();
    const [progress, setProgress] = useState(0);
    const updateInterval = 50; // Update every 500 milliseconds

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer); // Stop updating when progress reaches 100%
                    return 100;
                }
                // Generate a random step size (a random number between 1 and 10)
                const randomStep = Math.random() * (10 - 1) + 1;
                // Calculate the remaining progress value, ensuring it does not exceed 100
                return Math.min(Math.ceil(oldProgress + randomStep), 100);

            });
        }, updateInterval); // Update every 50ms

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                    : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
                minWidth: '100vw',
                minHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            {/* Rotating indicator */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    border: `8px solid ${theme.palette.primary.light}`,
                    borderTop: `8px solid ${theme.palette.primary.dark}`,
                    marginBottom: theme.spacing(4),
                }}
            />

            {/* Progress bar and percentage display */}
            <Box sx={{ width: '50%', textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Loading... {progress.toFixed(0)}%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[300],
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main,
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default LoadingSpinnerWithRandomSpeed;
