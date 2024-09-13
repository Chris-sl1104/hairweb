import React, { useState } from 'react';
import {Box, Drawer, IconButton, List, ListItem, Button, Typography, Divider, Switch} from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // 引入 Brightness4Icon
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ShoppingCart = () => {
    const theme = useTheme(); // 获取当前的主题
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Shampoo', quantity: 2, price: 12.99 },
        { id: 2, name: 'Conditioner', quantity: 1, price: 8.99 },
        { id: 3, name: 'Hair Dryer', quantity: 1, price: 49.99 },
        { id: 4, name: 'Hair Brush', quantity: 3, price: 4.99 }
    ]);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const handleQuantityChange = (id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <IconButton onClick={toggleCart} sx={{ color:'white' }}>
                <LocalGroceryStoreIcon />
            </IconButton>

            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={toggleCart}
                PaperProps={{
                    sx: {
                        width: { xs: '70vw', sm: '400px' },
                        maxHeight: '70vh',
                        mt: 10,
                        borderRadius: '30px',
                        padding: 2,
                        boxShadow: 5,
                        backgroundColor: theme.palette.background.default, // 动态适应主题的背景色
                        overflowY: 'auto',
                    }
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Your Shopping Cart
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {cartItems.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 60, color: '#c0c0c0', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#757575' }}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9e9e9e', mt: 1 }}>
                            Add some products to your cart to see them here.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <List>
                            {cartItems.map((item) => (
                                <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, borderBottom: '1px solid #e0e0e0' }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => handleQuantityChange(item.id, -1)} sx={{ color: '#ff1744' }}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</Typography>
                                        <IconButton onClick={() => handleQuantityChange(item.id, 1)} sx={{ color: '#4caf50' }}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ color: '#ff1744' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ mt: 2 }} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                            <Typography variant="h6">Total:</Typography>
                            <Typography variant="h6">${getTotalPrice()}</Typography>
                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '100%',
                                    backgroundColor: '#1976d2',
                                    '&:hover': { backgroundColor: '#1565c0' },
                                    fontWeight: 'bold',
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </>
                )}
            </Drawer>
        </div>
    );
};

const App = () => {
    const [mode, setMode] = useState('light');

    const theme = createTheme({
        palette: {
            mode,
            background: {
                default: mode === 'light' ? '#f9f9f9' : '#121212',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: {sm: 0, md: 1, lg: 2}}}>
                {/* 左边的 Brightness4Icon 和 Switch 切换模式 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={() => setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))}
                        color="inherit"
                    >
                        <Brightness4Icon />
                    </IconButton>
                    {/* 添加的 Switch 开关 */}
                    <Switch
                        checked={mode === 'dark'}
                        onChange={() => setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))}
                    />
                </Box>
                {/* 右边的购物车图标 */}
                <ShoppingCart />
            </Box>
        </ThemeProvider>

    );
};

export default App;
