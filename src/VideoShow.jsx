import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './Welcome.css';
import { Typography, Box } from '@mui/material';

export default function VideoShow() {
    const [videoPlayed, setVideoPlayed] = useState(Array(12).fill(false));
    const videoRefs = useRef([]); // 存储视频元素的引用

    const handleImageClick = (index) => {
        const updatedPlayedStatus = [...videoPlayed];
        updatedPlayedStatus[index] = true;
        setVideoPlayed(updatedPlayedStatus);

        // 等待视频加载完成后进入全屏模式
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            videoElement.play().then(() => {
                // 确保视频已经开始播放后进入全屏
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
                console.error('Error attempting to play the video:', err);
            });
        }
    };

    const videoUrls = [
        'src/videoplayback.mp4', // 示例视频路径
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

    const placeholderImage =
        'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg';

    return (
        <div className="welcomeClass">
            <Typography
                variant="h1"
                className="font-antic-didone"
                sx={{
                    marginTop: { xs: '50px', md: '70px' , lg: "90px"}, // 顶部 margin
                    marginBottom: { xs: '50px', md: '70px' , lg: '80px'}, // 底部 margin
                    marginLeft: { xs: '15px', md: '35px' }, // 左侧 margin
                    marginRight: '15px', // 右侧 margin
                    fontSize: { xs: '40px', sm: "50px", md: '60px', lg: "70px"}, // 根据屏幕大小调整字体
                    textAlign: 'left',
                    fontFamily: '"Antic Didone", serif', // 直接在 sx 中设置字体
                }}
            >
                Instagram Videos
            </Typography>

    <Box sx={{flexGrow: 1, p: 2}}>
    <Grid container spacing={0}>
                    {videoUrls.map((videoUrl, index) => (
                        <Grid
                            item
                            xs={6} // 小屏幕每行2个
                            md={3} // 大屏幕每行4个
                            key={index}
                            sx={{
                                padding: '0',
                            }}
                        >
                            <Card sx={{ width: '100%', height: '0', paddingBottom: '66.67%', position: 'relative' }}>
                                {videoPlayed[index] ? (
                                    <Box
                                        component="video"
                                        ref={(el) => (videoRefs.current[index] = el)} // 保存视频元素引用
                                        src={videoUrl}
                                        controls
                                        muted
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
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
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>

    );
}
