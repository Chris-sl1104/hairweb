import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Zitzroy() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw', // 设置为视口宽度
                height: {xs: "50vh", sm: '60vh', md: "70vh"}, // 设置为全屏高度的60%
                backgroundImage: `url(src/Fitzroy.jpg)`, // 背景图片路径
                backgroundSize: 'cover', // 背景图片覆盖整个容器
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center', // 垂直居中内容
                justifyContent: 'center', // 内容水平居中
                padding: { xs: '0 20px', sm: '0 40px' }, // 为小屏幕和大屏幕设置不同的内边距
                overflow: 'hidden',
                boxSizing: 'border-box', // 确保padding不会导致内容溢出
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
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 黑色半透明遮罩
                    zIndex: 0,
                }}
            />

            {/* 内容部分 */}
            <Grid
                container
                direction="column"
                alignItems="center" // 小屏幕下内容居中对齐
                sx={{
                    zIndex: 1,
                    textAlign: 'center', // 文本居中对齐
                    color: 'white',
                    marginRight: { xs: '0', md: '5%' }, // 小屏幕居中，大屏幕右移
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '6rem', xm: "7rem", md: '9rem', lg: "11rem"}, // 根据屏幕大小调整字体大小
                        marginBottom: '20px', // 与描述文本的间距
                    }}
                >
                    FITZROY
                </Typography>

                <Typography
                    variant="h3" // 默认的 variant
                    sx={{
                        marginBottom: '40px',
                        fontSize: { xs: '2rem', md: '3rem', lg: "4rem"}, // 根据屏幕大小调整字体大小
                        fontWeight: { xm: 200, md: 300 }, // 根据屏幕大小调整字体粗细
                    }}
                >
                    born and bred since 2002
                </Typography>

            </Grid>
        </Box>
    );
}
