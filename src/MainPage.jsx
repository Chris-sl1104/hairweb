import React, { useState } from 'react';
import {Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MainPage() {
    // 使用 useMediaQuery 来判断屏幕尺寸是否为手机尺寸（假设小于600px为手机尺寸）
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isVideoLoaded, setIsVideoLoaded] = useState(false); // 跟踪视频加载状态

    // 视频加载完成后调用的函数
    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    };

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
                        width: '100vw', // 宽度全屏
                        height: '100vh', // 高度全屏
                        objectFit: 'cover', // 确保图片按比例填满屏幕
                        zIndex: 0, // 确保图片在视频下层
                        transform: isMobile ? 'none' : 'rotate(90deg) scaleX(-1)', // 电脑时旋转90度并水平翻转，手机时不旋转
                    }}
                />
            )}


            <Box
                component="video"
                src="src/coverVideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoaded} // 视频加载完成时触发
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: isMobile ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) ' +
                        'rotate(90deg) scaleX(-1)', // 在旋转的同时保持居中
                    width: isMobile ? '100vw' : '100vh',  // 手机时宽度全屏，电脑时高度全屏
                    height: isMobile ? '100vh' : '100vw', // 手机时高度全屏，电脑时宽度全屏
                    objectFit: 'cover', // 确保视频填满整个容器
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明黑色遮罩
                    pointerEvents: 'none', // 防止遮罩影响鼠标事件
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
                    zIndex: 1, // 确保内容位于遮罩上方
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // 添加文字阴影
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        marginBottom: 2,
                        fontSize: { xs: '2.5rem', sm: '4.2rem', md: '4.2rem', lg:"4.5rem" },
                    }}
                >
                    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                        Hair Salon
                    </Box>
                    <Box component="span"
                         sx={{ display: { sx: 'block', md: 'inline' } }}>
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
