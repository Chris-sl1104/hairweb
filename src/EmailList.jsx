import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function EmailList() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: 'auto',
                height: '100vh', // 设置为全屏高度
                backgroundImage: `url(src/emailimg.png)`, // 背景图片路径
                backgroundSize: 'cover', // 背景图片覆盖整个容器
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center', // 垂直居中内容
                justifyContent: 'center', // 小屏幕下内容水平居中
                padding: { xs: '0 20px', sm: '0 40px' }, // 为小屏幕和大屏幕设置不同的内边距
                overflow: 'hidden'
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
                    maxWidth: '400px', // 限制内容最大宽度
                    textAlign: 'center', // 文本居中对齐
                    color: 'white',
                    // 在大屏幕下向右偏移
                    marginLeft: { xs: '0', md: '20%' }, // 小屏幕居中，大屏幕右移
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '20px', // 与描述文本的间距
                    }}
                >
                    Join our Mailing List
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: '40px', // 与输入框的间距
                    }}
                >
                    Sign up with your email address to receive news and updates.
                </Typography>

                <TextField
                    id="first-name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景半透明
                        borderRadius: '4px',
                        marginBottom: '10px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // 响应式最大宽度设置
                        width: '90%', // 使得输入框在小屏幕时也不会超过100%宽度
                        boxSizing: 'border-box', // 包含padding在宽度内
                        '& label.Mui-focused': {
                            color: 'black',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'black',
                            }
                        }
                    }}
                />

                <TextField
                    id="last-name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景半透明
                        borderRadius: '4px',
                        marginBottom: '10px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // 响应式最大宽度设置
                        width: '90%', // 使得输入框在小屏幕时也不会超过100%宽度
                        boxSizing: 'border-box', // 包含padding在宽度内
                        '& label.Mui-focused': {
                            color: 'black',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'black',
                            }
                        }
                    }}
                />

                <TextField
                    id="email-address"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景半透明
                        borderRadius: '4px',
                        marginBottom: '20px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // 响应式最大宽度设置
                        width: '90%', // 使得输入框在小屏幕时也不会超过100%宽度
                        boxSizing: 'border-box', // 包含padding在宽度内
                        '& label.Mui-focused': {
                            color: 'black',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'black',
                            }
                        }
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#000000', // 黑色按钮
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' }, // 响应式最大宽度设置
                        width: '90%', // 使得按钮在小屏幕时也不会超过100%宽度
                        boxSizing: 'border-box', // 包含padding在宽度内
                    }}
                >
                    SIGN UP
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        color: '#ffffff', // 蓝色文字
                    }}
                >
                    We respect your privacy.
                </Typography>
            </Grid>
        </Box>
    );
}
