import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery'; // 导入 useMediaQuery

export default function Review() {
    const [isExpanded, setIsExpanded] = useState(false); // 控制文本是否展开
    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // 切换文本展开状态
    };

    // 使用 useMediaQuery 进行响应式判断
    const isSmallScreen = useMediaQuery('(max-width:960px)'); // 定义小于 960px 为小屏

    // 根据屏幕大小和 isExpanded 状态来决定布局方向
    const direction = isSmallScreen || isExpanded ? 'column' : 'row';

    // 定义 setMaxWidth 函数
    const setMaxWidth = (isSmallScreen, { boxDirection }) => {
        if (boxDirection === 'left') {
            if (isSmallScreen) {
                return '100%'; // 小屏幕时，占满宽度
            } else {
                return '50%'; // 大屏幕时，占50%宽度
            }
        } else {
            if (isSmallScreen) {
                return '100%'; // 小屏幕时，占满宽度
            } else {
                return '75%'; // 大屏幕时，占50%宽度
            }
        }
    };


    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '68vh',
                backgroundImage: `url(src/Shampoo.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '0 20px', sm: '0 40px' },
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* 半透明遮罩 */}
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

            {/* 内容部分 */}
            <Grid
                container
                spacing={2}
                direction={direction}  // 根据方向值动态设置
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: '100%',
                    zIndex: 1,
                    padding: isSmallScreen ? '0 20px' : '0', // 在小屏幕时为Grid容器增加左右padding，防止框子贴到屏幕边缘
                }}
            >

                {/* 左侧部分 */}
                <Grid item xs={12} md={4}> {/* 设置 xs={12} 和 md={6} 使其在大屏时各占50% */}
                    <Box
                        sx={{
                            padding: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明背景
                            borderRadius: '8px',
                            minHeight: '150px', // 保证初始高度一致
                            maxHeight: isExpanded ? 'none' : '150px', // 展开时取消最大高度限制
                            display: 'flex',
                            width: '100%',
                            maxWidth: setMaxWidth( isSmallScreen, {boxDirection: "left"}),
                            margin: 'auto',



















                            //maxWidth: {sm: "100%", md: '70%', lg:"50%", xl: "40%"}, // 占满父容器宽度
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
                                marginBottom: '16px',
                            }}
                        >
                            Google Reviews
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'black',
                                textAlign: 'center',
                                fontSize: { xs: '1rem', md: '1.25rem' },
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
                                marginBottom: '3px',
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

                {/* 右侧部分 */}
                <Grid item xs={12} md={6}> {/* 设置 xs={12} 和 md={6} 使其在大屏时各占50% */}
                    <Box
                        sx={{
                            padding: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            minHeight: '150px',
                            maxHeight: isExpanded ? 'none' : '150px', // 控制初始高度
                            width: '100%', // 占满父容器宽度
                            maxWidth: setMaxWidth( isSmallScreen, {boxDirection: "right"}),
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
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
                                marginBottom: '5px',
                            }}
                        >
                            Latest Reviews
                        </Typography>
                        <Box sx={{ maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'black',
                                    textAlign: 'center',
                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                    overflow: 'hidden', // 隐藏溢出内容
                                    textOverflow: 'ellipsis', // 添加省略号
                                    display: '-webkit-box',
                                    WebkitLineClamp: isExpanded ? 'none' : 2, // 控制显示2行，点击展开时显示完整
                                    WebkitBoxOrient: 'vertical',
                                    whiteSpace: 'normal',
                                }}
                            >
                                "Best hair salon in town, highly recommended! This is a place where you can enjoy a great atmosphere, professional service, and walk out feeling amazing. Their attention to detail is second to none."
                            </Typography>

                            {/* View More/ View Less 按钮 */}
                            <Button onClick={toggleExpand}
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#000000',
                                        color: 'white',
                                        padding: '10px 10px',
                                        borderRadius: '4px',
                                        marginBottom: '3px',
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
        </Box>
    );
}
