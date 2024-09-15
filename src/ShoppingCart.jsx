import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, Button, Typography, Divider } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'; // 使用 Redux
import { addItem, removeItem, updateQuantity } from './redux/cartSlice';
import {useNavigate} from "react-router-dom"; // 导入 Redux actions


const ShoppingCart = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [cartOpen, setCartOpen] = useState(false);
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.mode === 'dark');

    // 从 Redux 中获取购物车状态
    const cartItems = useSelector((state) => state.cart.items);


    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    // 处理数量更改
    const handleQuantityChange = (item, delta) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0) {
            // 使用 Redux action 更新购物车中的商品数量
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        }
    };

    // 处理移除商品
    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
    };


    // 计算总价
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <IconButton onClick={toggleCart} sx={{ color: isDarkMode ? 'white' : 'black'}}>
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
                        backdropFilter: 'blur(15px)',
                        padding: 2,
                        boxShadow: 5,
                        backgroundColor: 'rgba(180, 180, 180, 0.1)',
                        color: theme.palette.text.primary,
                        overflowY: 'auto',
                    }
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: theme.palette.text.primary }}>
                    Your Shopping Cart
                </Typography>
                <Divider sx={{ mb: 2, backgroundColor: theme.palette.divider }} />

                {cartItems.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: theme.palette.text.secondary }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 60, color: theme.palette.text.disabled, mb: 2 }} />
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                            Add some products to your cart to see them here.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <List>
                            {cartItems.map((item) => (
                                <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => handleQuantityChange(item, -1)} sx={{ color: '#ff1744' }}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ minWidth: '20px', textAlign: 'center', color: theme.palette.text.primary }}>{item.quantity}</Typography>
                                        <IconButton onClick={() => handleQuantityChange(item, 1)} sx={{ color: '#4caf50' }}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ color: '#ff1744' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ mt: 2, backgroundColor: theme.palette.divider }} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>Total:</Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>${getTotalPrice()}</Typography>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    navigate('/shopping');
                                        toggleCart();
                                }}
                                sx={{
                                    width: '100%',
                                    fontWeight: 'bold',
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                }}
                            >
                                View More
                            </Button>
                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    navigate('/shopcheckout');
                                    toggleCart();
                                }}
                                sx={{
                                    width: '100%',
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

export default ShoppingCart;