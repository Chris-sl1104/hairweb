import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    CardMedia,
    CardActions,
    Modal,
    CircularProgress,
    Box,
    IconButton,
    TextField,
    Badge,
    Snackbar,
    Alert,
    Button
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { ArrowBackIos, ArrowForwardIos, Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'; // 使用 Redux
import { addItem, updateQuantity } from './redux/cartSlice'; // 导入 Redux actions

// Function to get the current day of the week
const getCurrentDay = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return daysOfWeek[today.getDay()];
};

const Shopping = () => {
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [info, setInfo] = useState('');
    const [items, setItems] = useState([]); // State to store the list of items
    const [loading, setLoading] = useState(true); // State to handle loading
    const [activeIndex, setActiveIndex] = useState(0); // Track the current swipe index
    const [quantities, setQuantities] = useState({}); // Store the quantity of each item
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Get window width for responsive design
    const [currentDay, setCurrentDay] = useState('For Today'); // Store the current day

    const dispatch = useDispatch(); // Get dispatch function from Redux
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

    useEffect(() => {
        // Set the current day in the state
        const day = getCurrentDay();
        setCurrentDay(`this ${day}`);
    }, []);

    // Fetch items from the backend API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('https://kieuhairdesigner.com.au:5000/items'); // Ensure the backend is running and returning items
                setItems(response.data); // Set the items from API
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching items:', error); // Handle errors when fetching items
                setLoading(false); // Stop loading on error
            }
        };

        fetchItems();
    }, []);

    // Listen for window resize to update width
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const maxItemsLg = 8;  // Maximum items to display on large screens
    const maxItemsMd = 6;  // Maximum items to display on medium screens
    const isLg = windowWidth >= 1200; // Define large screen breakpoint
    const isMd = windowWidth >= 900 && windowWidth < 1200; // Define medium screen breakpoint

    // 处理本地数量更改（仅在本地管理）
    const handleLocalQuantityChange = (id, increment) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + increment),
        }));
    };

    // 处理将商品加入购物车
    const handleQuantityChange = (item) => {
        const quantity = quantities[item.id] || 0;
        setInfo('Successfully added to cart');
        setOpenSnackbar(true);

        if (quantity === 0) {
            setOpenSnackbar(true);
            setInfo('Quantity cannot be 0');
            return;
        }

        // 使用 Redux dispatch 添加商品到购物车
        dispatch(addItem({ ...item, quantity }));
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setInfo('')
    };



    // Display loading spinner if items are still being fetched
    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    }

    // Display a message if no items are available
    if (items.length === 0) {
        return <Typography variant="h6" align="center" sx={{ mt: 4 }}>No items available to display</Typography>;
    }

    // Handle swipe next for mobile view
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % Math.ceil(items.length / 4));
    };

    // Handle swipe previous for mobile view
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + Math.ceil(items.length / 4)) % Math.ceil(items.length / 4));
    };

    // Function to render each item card to avoid code duplication
    // renderCard 函数内
    const renderCard = (item) => (
        <Card
            sx={{
                boxShadow: 4,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 8 },
                backgroundColor: 'white',
                color: 'black',
            }}
        >
            <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '0.9rem' }, color: 'black' }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem' }, color: 'gray' }}>
                    Price: ${item.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.6rem' }, color: 'gray' }}>
                    {item.description?.substring(0, 60)}...
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        sx={{
                        fontSize: '0.8rem',
                        color: 'black',
                        transition: '0.3s',
                        '&:hover': {
                            color: 'green',
                            transform: 'scale(1.1)',
                        },
                        '&:active': {
                            transform: 'scale(0.9)',
                        },
                    }}
                                onClick={() => handleLocalQuantityChange(item.id, -1)}>
                        <Remove sx={{ fontSize: '0.8rem', color: 'black' }} />
                    </IconButton>
                    <TextField
                        value={quantities[item.id] || 0} // Display quantity from local state
                        inputProps={{
                            readOnly: true,
                            style: { textAlign: 'center', width: '.9rem', color: 'black' },
                        }}
                        variant="outlined"
                        size="small"
                        sx={{
                            mx: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                    />
                    <IconButton
                        onClick={() => handleLocalQuantityChange(item.id, 1)}
                        sx={{
                            fontSize: '0.8rem',
                            color: 'black',
                            transition: '0.3s',
                            '&:hover': {
                                color: 'green',
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                transform: 'scale(0.9)',
                            },
                        }}
                    >
                        <Add sx={{ fontSize: '0.8rem' }} />
                    </IconButton>

                </Box>
                <IconButton
                    sx={{
                        padding: '4px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 255, 0.1)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            transform: 'scale(1.1)',
                        },
                        '&:active': {
                            transform: 'scale(0.95)',
                        },
                    }}
                    onClick={() => handleQuantityChange(item)}
                >
                    <Badge
                        badgeContent={quantities[item.id] || 0}
                        sx={{
                            '& .MuiBadge-badge': {
                                color: 'white',
                                backgroundColor: 'red',
                                fontSize: '0.75rem',
                                minWidth: '20px',
                                height: '20px',
                            },
                        }}
                    >
                        <AddShoppingCartIcon
                            sx={{
                                fontSize: '2rem',
                                color: 'blue',
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: '#0056b3',
                                },
                            }}
                        />
                    </Badge>
                </IconButton>


            </CardActions>
        </Card>
    );


    // Desktop layout logic, with sliding arrows for navigation
    const desktopLayout = (
        <Box sx={{ position: 'relative', padding: 2, overflow: 'hidden' }}>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    zIndex: 10,
                    transform: 'translateY(-50%)',
                    fontSize: '2rem',
                    color: theme.palette.warning.dark,
                    transition: '0.3s',
                    '&:hover': {
                        color: theme.palette.warning.main,
                        transform: 'translateY(-50%) scale(1.1)',
                    },
                    '&:active': {
                        transform: 'translateY(-50%) scale(0.9)',
                    },
                }}
                onClick={handlePrev}
            >
                <ArrowCircleLeftRoundedIcon sx={{ fontSize: '4rem' }} />
            </IconButton>

            <Grid container spacing={4} sx={{ padding: { sm: 3, md: 5, lg: 9, xl: 20 } }}>
                {items.map((item, index) => {
                    if (isLg && index >= maxItemsLg) return null; // Show a maximum of 8 items for large screens
                    if (isMd && index >= maxItemsMd) return null; // Show a maximum of 6 items for medium screens
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            {renderCard(item)}
                        </Grid>
                    );
                })}
            </Grid>

            <IconButton
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    zIndex: 10,
                    transform: 'translateY(-50%)',
                    fontSize: '2rem',
                    color: theme.palette.warning.dark,
                    transition: '0.3s',
                    '&:hover': {
                        color: theme.palette.warning.main,
                        transform: 'translateY(-50%) scale(1.1)',
                    },
                    '&:active': {
                        transform: 'translateY(-50%) scale(0.9)',
                    },
                }}
                onClick={handleNext}
            >
                <ArrowCircleRightRoundedIcon sx={{ fontSize: '4rem' }} />
            </IconButton>

        </Box>
    );

    // Mobile layout with swipeable views
    const mobileLayout = (
        <Box sx={{ position: 'relative', padding: '20px 0', overflow: 'hidden', width: '100vw' }}>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    zIndex: 10,
                    transform: 'translateY(-25%)',
                    fontSize: '2rem',
                    color: theme.palette.warning.dark,
                    transition: '0.3s',
                    '&:hover': {
                        color: theme.palette.warning.dark,
                        transform: 'translateY(-25%) scale(1.1)',
                    },
                    '&:active': {
                        transform: 'translateY(-50%) scale(0.9)',
                    },
                }}
                onClick={handlePrev}
            >
                <ArrowCircleLeftRoundedIcon sx={{ fontSize: '4rem' }} />
            </IconButton>

            <SwipeableViews
                index={activeIndex}
                onChangeIndex={setActiveIndex}
                enableMouseEvents
                style={{ overflow: 'hidden' }}
                containerStyle={{ width: '92%', paddingTop: '20px', paddingBottom: '20px' }} // Set padding for swipe views
            >
                {Array.from({ length: Math.ceil(items.length / 4) }).map((_, i) => (
                    <Box key={i} sx={{
                        padding: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        boxSizing: 'border-box'  // Ensure padding does not overflow
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
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    zIndex: 10,
                    transform: 'translateY(-25%)',
                    fontSize: '2rem',
                    color: theme.palette.warning.dark,
                    transition: '0.3s',
                    '&:hover': {
                        color: theme.palette.warning.dark,
                        transform: 'translateY(-25%) scale(1.1)',
                    },
                    '&:active': {
                        transform: 'translateY(-50%) scale(0.9)',
                    },
                }}
                onClick={handleNext}
            >
                <ArrowCircleRightRoundedIcon sx={{ fontSize: '4rem' }} />
            </IconButton>
        </Box>
    );

    return (
        <Box
            sx={{ paddingBottom: 20, overflow: "hidden",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}> {/* Wrap the whole page container */}
            <Divider sx={{ backgroundColor: theme.palette.divider, marginBottom: 10, marginTop: 10, width: '75%', marginX: 'auto', height: "2px" }} />

            {/* Add the header content */}
            <Box sx={{ paddingTop: 4, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.warning.dark,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem' } // Responsive font sizes
                    }}
                >
                    Ready to treat yourself {currentDay}?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.primary,
                        marginTop: 2,
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem', xl: '1.8rem' } // Responsive body1 text
                    }}
                >
                    - Explore our latest collections below -
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.warning.dark,
                        marginTop: 1,
                        fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' } // Responsive body2 text
                    }}
                >
                    Don't miss out on special offers!
                </Typography>
            </Box>

            {/* Layout for mobile and desktop */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                {mobileLayout}
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {desktopLayout}
            </Box>
            {/* Modal for quantity 0 warning */}
            <Modal
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 280, sm: 350, md: 400, lg: 500 },
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        border: 'none',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2"
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' } // 响应式调整字体大小
                                }}>
                        {info}
                    </Typography>
                    <Button onClick={handleCloseSnackbar} sx={{
                        mt: 2,
                        backgroundColor: theme.palette.mode === 'dark' ? '#b97a00' : '#7219d2',
                        color: '#fff', // 文本颜色为白色
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgb(185,122,0)' : '#7219d2',
                        },
                        '&:active': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(155,121,1,0.72)' : '#511194',
                        },
                        boxShadow: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                    }} variant="contained">
                        Close
                    </Button>
                </Box>
            </Modal>

        </Box>
    );
};

export default Shopping;
