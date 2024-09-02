import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import "./Welcome.css"

export default function About() {
    return (
        <Box
            className="welcomeClass"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                /*padding: { xs: '20px', md: '40px' },*/
            }}
        >
            <Grid
                container
                spacing={2}
                direction={{ xs: 'column', md: 'row' }} // 小屏幕垂直排列，大屏幕水平排列
                alignItems="center"
            >
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            margin: {xs: "1rem", md: "2rem"}
                        }}>
                        <Typography

                            variant="h2"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                textAlign: { xs: 'center', md: 'left' }, // 小屏幕居中对齐，大屏幕左对齐
                            }}
                        >
                            About Us
                        </Typography>
                        <Typography
                            variant="h5"
                            className="font-antic-didone"
                            sx={{
                                fontFamily: 'Antic Didone, serif',
                                textAlign: { xs: 'center', md: 'left' }, // 小屏幕居中对齐，大屏幕左对齐
                            }}
                        >
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi
                                a sapien varius, et consequat lacus laoreet. Pellentesque habitant morbi
                                tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi
                                a sapien varius, et consequat lacus laoreet. Pellentesque habitant morbi
                                tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi
                                a sapien varius, et consequat lacus laoreet. Pellentesque habitant morbi
                                tristique senectus et netus et malesuada fames ac turpis egestas.
                            </p>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%', // 使Box的高度充满Grid项
                            overflow: 'hidden', // 隐藏超出Box的部分
                        }}
                    >
                        <Box
                            component="img"
                            src="./src/About.jpg" // 请替换为实际图片URL
                            alt="About Us"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // 使图片覆盖整个Box
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
