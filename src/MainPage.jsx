import React, { useEffect, useRef, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MainPage() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null); // 用于引用视频元素

    // 视频加载完成后调用的函数
    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    };

    // 使用 useEffect 尝试在组件加载后手动播放视频
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = true; // 确保视频静音
            videoElement.play().catch((error) => {
                console.error("Autoplay was prevented:", error);
                // 处理自动播放失败
            });
        }
    }, []);

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {/* Placeholder 图片，视频未加载完成时显示 */}
            {!isVideoLoaded && (
                <Box
                    component="img"
                    src="src/coverVideoPlaceholder.png" // 占位符图片的路径
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

            {/* 视频元素 */}
            <Box
                component="video"
                ref={videoRef} // 通过 ref 获取视频元素
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

            {/* 半透明遮罩 */}
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

            {/* 中央内容 */}
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
