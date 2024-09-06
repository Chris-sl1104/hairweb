import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, CardActions, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const Shopping = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // 加载商品数据
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/items'); // 确保后端运行并返回商品数据
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // 如果正在加载，显示加载动画
    if (loading) {
        return <CircularProgress />;
    }

    // 如果没有商品，显示提示
    if (items.length === 0) {
        return <Typography variant="h6">没有商品可展示</Typography>;
    }

    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={`/${item.image}`} // 确保 image 是正确路径
                            alt={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                价格: ${item.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" color="primary">
                                加入购物车
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Shopping;
