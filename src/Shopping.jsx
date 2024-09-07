import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider, CardMedia, CardActions, CircularProgress, Box, IconButton, TextField, Badge } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { ArrowBackIos, ArrowForwardIos, Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

// 获取当前星期的函数
const getCurrentDay = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return daysOfWeek[today.getDay()];
};


const Shopping = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0); // 记录当前滑动的索引
    const [quantities, setQuantities] = useState({}); // 用于存储每个商品的数量
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 获取窗口宽度
    const [currentDay, setCurrentDay] = useState('For Today');

    useEffect(() => {
        // 获取当前星期并设置为 state
        const day = getCurrentDay();
        setCurrentDay(`this ${day}`);
    }, []);

    // 加载商品数据
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://192.168.0.108:5000/items'); // 确保后端运行并返回商品数据
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // 监听窗口宽度变化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const maxItemsLg = 8;  // lg 尺寸下最多显示 8 个
    const maxItemsMd = 6;  // md 尺寸下最多显示 6 个
    const isLg = windowWidth >= 1200;
    const isMd = windowWidth >= 900 && windowWidth < 1200;

    // 控制商品数量
    const handleQuantityChange = (id, increment) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + increment),
        }));
    };

    // 如果正在加载，显示加载动画
    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    }

    // 如果没有商品，显示提示
    if (items.length === 0) {
        return <Typography variant="h6" align="center" sx={{ mt: 4 }}>No items available to display</Typography>;
    }

    // 处理滑动
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % Math.ceil(items.length / 4));
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + Math.ceil(items.length / 4)) % Math.ceil(items.length / 4));
    };

    // 提取卡片渲染逻辑，减少重复代码
    const renderCard = (item) => (
        <Card
            sx={{
                boxShadow: 4,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 8 },
                background: 'linear-gradient(135deg, #f0f0f0, #fafafa)',
            }}
        >
            <CardMedia
                component="img"
                height="150"
                image={`/${item.image}`}
                alt={item.name}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '0.9rem' } }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem' } }}>
                    Price: ${item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.6rem' } }}>
                    {item.description?.substring(0, 60)}...
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                        <Remove sx={{ fontSize: '0.8rem' }} />
                    </IconButton>
                    <TextField
                        value={quantities[item.id] || 1}
                        inputProps={{ readOnly: true, style: { textAlign: 'center', width: '.9rem' } }}
                        variant="outlined"
                        size="small"
                        sx={{ mx: 1 }}
                    />
                    <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                        <Add sx={{ fontSize: '0.8rem' }} />
                    </IconButton>
                </Box>
                <IconButton color="primary" sx={{ padding: '4px' }}>
                    <Badge badgeContent={quantities[item.id] || 0} color="secondary">
                        <AddShoppingCartIcon sx={{ fontSize: '2rem' }} />
                    </Badge>
                </IconButton>
            </CardActions>
        </Card>
    );

    // 电脑端卡片布局
    const desktopLayout = (
        <Box sx={{ position: 'relative', padding: 2, overflow: 'hidden' }}>
            <IconButton
                sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 10,
                    transform: 'translateY(-50%)', fontSize: '2rem', color: '#ffa83a' }}
                onClick={handlePrev}
            >
                <ArrowCircleLeftRoundedIcon sx={{ fontSize: '4rem' }}/>
            </IconButton>

            <Grid container spacing={4} sx={{ padding: { sm: 3, md: 5, lg: 9, xl: 20 } }}>
                {items.map((item, index) => {
                    if (isLg && index >= maxItemsLg) return null;
                    if (isMd && index >= maxItemsMd) return null;
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            {renderCard(item)}
                        </Grid>
                    );
                })}
            </Grid>

            <IconButton
                sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 10,
                    transform: 'translateY(-50%)', fontSize: '2rem', color: '#ffa83a' }}
                onClick={handleNext}
            >
                <ArrowCircleRightRoundedIcon sx={{ fontSize: '4rem' }}/>
            </IconButton>
        </Box>
    );

    // 手机端滑块布局，调整为每行两列，两行共显示四个卡片
    const mobileLayout = (
        <Box sx={{ position: 'relative', padding: '20px 0', overflow: 'hidden', width: '100vw' }}>
            <IconButton
                sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 10,
                    transform: 'translateY(-25%)', fontSize: '2rem', color: '#ffa83a' }}
                onClick={handlePrev}
            >
                <ArrowCircleLeftRoundedIcon sx={{ fontSize: '4rem' }}/>
            </IconButton>

            <SwipeableViews
                index={activeIndex}
                onChangeIndex={setActiveIndex}
                enableMouseEvents
                style={{ overflow: 'hidden' }}
                containerStyle={{ width: '92%', paddingTop: '20px', paddingBottom: '20px' }} // 设置上下留白
            >
                {Array.from({ length: Math.ceil(items.length / 4) }).map((_, i) => (
                    <Box key={i} sx={{
                        padding: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        boxSizing: 'border-box'  // 确保 padding 不会让内容溢出
                    }}>
                        <Grid container spacing={2}>
                            {items.slice(i * 4, i * 4 + 4).map((item) => (
                                <Grid item xs={6} key={item.id}>
                                    {renderCard(item)}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </SwipeableViews>

            <IconButton
                sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 10,
                    transform: 'translateY(-25%)', fontSize: '2rem', color: '#ffa83a' }}
                onClick={handleNext}
            >
                <ArrowCircleRightRoundedIcon sx={{ fontSize: '4rem' }}/>
            </IconButton>
        </Box>
    );


    return (
        <Box sx={{ paddingBottom: 20 }}> {/* 包裹整个页面的容器 */}
            {/* 分割线 */}
            <Divider sx={{ backgroundColor: '#666666',
                marginBottom: 10, marginTop: 10, width: '75%', marginX: 'auto' }} />

            {/* 添加顶部内容 */}
            <Box sx={{ paddingTop: 4, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: '#ffa726',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem' } // 字体大小随屏幕尺寸变化
                    }}
                >
                    Ready to treat yourself {currentDay}?
                </Typography>


                <Typography
                    variant="body1"
                    sx={{
                        color: '#fff',
                        marginTop: 2,
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem', xl: '1.8rem' } // 使 body1 字体大小响应式
                    }}
                >
                   - Explore our latest collections below -
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: '#ffa726',
                        marginTop: 1,
                        fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' } // 使 body2 字体大小响应式
                    }}
                >
                    Don't miss out on special offers!
                </Typography>
            </Box>


            {/* Existing layout for mobile and desktop */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                {mobileLayout}
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {desktopLayout}
            </Box>
        </Box>
    );

};

export default Shopping;
