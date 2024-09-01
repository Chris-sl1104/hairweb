import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

import './Welcome.css';

export default function Welcome() {
    return (
        <Box
            className="welcomeClass"
            sx={{
                flexGrow: 1,
                padding: 2,
                backgroundColor: 'black', // 设置背景颜色为黑色
                color: 'white', // 设置文本颜色为白色，以便在黑色背景上清晰可见
            }}
        >
            <Grid
                container
                spacing={2}
                direction={{ xs: 'column', sm: 'column', md: 'row' }} // 小屏幕上下布局，大屏幕左右布局
                alignItems="center"
            >
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h2"
                        component="h2"
                        className="font-antic-didone"
                        sx={{
                            fontSize: {xs: '2rem', sm: '2.5rem', md: '3.5rem'},  // 不同屏幕下的字体大小
                            fontFamily: 'Antic Didone, serif',  // 使用Antic Didone字体
                            fontWeight: 400,  // 字体粗细
                            lineHeight: 1.4,  // 行高
                            margin: {xs: "1rem", md: "2rem"}
                        }}
                    >
                        <br/> Welcome<br/><br/>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },  // 根据屏幕大小调整字体
                            fontFamily: 'Antic Didone, serif',  // 使用Antic Didone字体
                            lineHeight: 1.6,  // 行高
                            margin: {xs: "1rem", md: "2rem"}
                        }}
                    >
                        Welcome to Cream Melbourne! We're privileged to be situated in the heart of the bohemian
                        Fitzroy, offering you a peaceful oasis above the bustling Brunswick Street. At our salon, we
                        believe in breaking the mold when it comes to everyday styling. Our friendly team is always here
                        to ensure that your visit is unforgettable and has everyone asking, "Who did your hair?"

                        Our philosophy at Cream is to understand your individual preferences and create a stunning look
                        that complements your unique features and fits your lifestyle. We want your style to be
                        something you truly adore and feel confident managing, so you can keep returning for more.

                        We can't wait to help you achieve the perfect look that reflects your personality and makes you
                        feel fabulous!
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    overflow: 'hidden', // 确保任何超出容器的内容被隐藏
                    maxWidth: '100%', // 限制父容器的最大宽度不超过页面宽度
                }}>
                    <Box
                        component="img"
                        src="src/outside.jpeg"
                        alt="Welcome"
                        sx={{
                            width: '100%',
                            height: 'cover',  // 小屏幕下高度自动，大屏幕下固定为300px
                            objectFit: 'cover',
                            padding: { xs: '1rem', md: '2rem' },  // 设置内边距

                            maxWidth: '100%', // 限制图片的最大宽度不超过父容器的宽度
                            boxSizing: 'border-box', // 确保padding被包含在宽度内
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
