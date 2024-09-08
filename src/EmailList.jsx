import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';



export default function EmailList() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
    });

    const [formErrors, setFormErrors] = useState({}); // 用于存储表单错误状态
    const [isSubmitting, setIsSubmitting] = useState(false); // 用于追踪提交状态
    const [dialogOpen, setDialogOpen] = useState(false); // 控制 Dialog 是否显示
    const [dialogContent, setDialogContent] = useState(''); // 控制 Dialog 的内容

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // 提交表单
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 验证必填字段是否为空
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email 格式验证
        if (!formData.firstName) errors.firstName = 'First Name is required';
        if (!formData.lastName) errors.lastName = 'Last Name is required';
        if (!formData.emailAddress) {
            errors.emailAddress = 'Email Address is required';
        } else if (!emailRegex.test(formData.emailAddress)) {
            errors.emailAddress = 'Please enter a valid email address';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors); // 如果有错误，显示错误信息
            return;
        }

        setFormErrors({}); // 清空错误信息
        setIsSubmitting(true); // 开始提交，显示加载动画

        // 提交表单数据
        try {
            const response = await fetch('http://192.168.0.108:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setDialogContent('You have successfully signed up!'); // 成功消息
                setFormData({ firstName: '', lastName: '', emailAddress: '' }); // 清空表单
            } else {
                setDialogContent('There was an issue with your signup. Please try again.'); // 失败消息
            }
            setDialogOpen(true); // 显示弹窗
        } catch (error) {
            console.error('Error:', error);
            setDialogContent('There was an error processing your request.'); // 错误消息
            setDialogOpen(true); // 显示弹窗
        } finally {
            setIsSubmitting(false);
        }
    };
    // 关闭弹窗的函数
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

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
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!formErrors.firstName} // 如果有错误，显示红色边框
                    helperText={formErrors.firstName} // 显示错误消息
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
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!formErrors.lastName} // 如果有错误，显示红色边框
                    helperText={formErrors.lastName} // 显示错误消息
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
                    id="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    value={formData.emailAddress}
                    onChange={handleChange}
                    error={!!formErrors.emailAddress} // 如果有错误，显示红色边框
                    helperText={formErrors.emailAddress} // 显示错误消息
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

                {/* 在提交时显示加载动画 */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting} // 提交时禁用按钮
                    sx={{
                        backgroundColor: '#000000',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        maxWidth: { xs: '60%', sm: '80%', md: '100%' },
                        width: '90%',
                        boxSizing: 'border-box',
                        '&:disabled': {
                            backgroundColor: '#000000', // 禁用状态下的背景颜色
                            color: '#fff', // 禁用状态下的文字颜色
                        }
                    }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'SIGN UP'} {/* 提交时显示加载动画 */}
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
            {/* 弹窗组件 */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
