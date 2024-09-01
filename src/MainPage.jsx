import React from 'react';
import Ripples from 'react-ripples';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MainPage() {
    const rippleRef = React.useRef(null);

    const handleMouseMove = (event) => {
        const ripple = rippleRef.current;
        console.log('Mouse move event:', event);
        if (ripple) {
            console.log('Ripple instance:', ripple);
            const rect = ripple.container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            ripple.createRipple({ pageX: x, pageY: y });
        }
    };
    return (

        <Box sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* 使用 react-ripples 实现水波效果 */}
            <Ripples color="rgba(255, 255, 255, 0.3)" during={1000}>
                <Box
                    component="img"
                    src="src/peakpx.jpg"
                    alt="Peak Image"
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        maxHeight: '100vh',
                        objectFit: 'cover',
                    }}
                />
            </Ripples>

            {/*/!* 背景图片 *!/*/}
            {/*<Box*/}
            {/*    component="img"*/}
            {/*    src="src/peakpx.jpg"*/}
            {/*    alt="Peak Image"*/}
            {/*    sx={{*/}
            {/*        width: '100vw',*/}
            {/*        height: 'auto',*/}
            {/*        maxHeight: '100vh',*/}
            {/*        objectFit: 'cover',*/}
            {/*    }}*/}
            {/*/>*/}

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
