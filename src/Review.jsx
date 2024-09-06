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
                return '90%'; // 小屏幕时，占满宽度
            } else {
                return '50%'; // 大屏幕时，占50%宽度
            }
        } else {
            if (isSmallScreen) {
                return '90%'; // 小屏幕时，占满宽度
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
                height: 'auto',
                backgroundImage: `url(src/Shampoo.jpg)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '50px 0px', sm: '80px 0px' },
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
            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'white',
                    marginRight: { xs: '0', md: '5%' },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: '4rem', sm: '5rem', md: '7rem', lg: '9rem' },
                        marginBottom: '1vh',
                    }}
                >
                    Testimonials
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: '5vh',
                        fontSize: { xs: '1rem', md: '2rem', lg: '3rem' },
                        fontWeight: { sm: 200, md: 300 },
                    }}
                >
                    Our reviews are second to none
                </Typography>

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
                    padding: isSmallScreen ? '0 5vh' : '0', // 在小屏幕时为Grid容器增加左右padding，防止框子贴到屏幕边缘
                    paddingRight: { xs: '5vw', sm: '3vw', md: '0vw' }, // 只在小屏幕时添加右边 padding
                    transition: 'all 0.5s ease', // 添加动画过渡效果
                }}
            >


            {/* 左侧部分 */}
                <Grid item xs={12} md={4}> {/* 设置 xs={12} 和 md={6} 使其在大屏时各占50% */}
                    <Box
                        sx={{
                            transition: 'all 0.5s ease',
                            padding: '6%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明背景
                            borderRadius: '8px',
                            minHeight: '150px', // 保证初始高度一致
                            maxHeight: isExpanded ? '1000px' : '150px', // 展开时取消最大高度限制
                            display: 'flex',
                            width: '100%',
                            maxWidth: setMaxWidth( isSmallScreen, {boxDirection: "left"}),
                            margin: 'auto',
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
                                marginBottom: '3px',
                            }}
                        >
                            Google Reviews
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'black',
                                textAlign: 'center',
                                fontWeight: 'normal',
                                fontSize: { xs: '1.3rem', md: '1.5rem' },
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
                            transition: 'all 0.5s ease',
                            padding: '4%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            minHeight: '150px',
                            maxHeight: isExpanded ? '1000px' : '150px', // 控制初始高度
                            width: '100%', // 占满父容器宽度
                            maxWidth: setMaxWidth( isSmallScreen, {boxDirection: "right"}),
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                transition: 'all 0.5s ease',
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
                                    transition: 'all 0.5s ease',
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
            </Grid>
        </Box>
    );
}
