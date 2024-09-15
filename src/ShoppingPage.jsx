import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
    CardActions,
    Modal,
    CircularProgress,
    Box,
    IconButton,
    TextField,
    Badge,
    Button,
    Tabs,
    Tab,
} from '@mui/material';
import { Add, Remove, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addItem } from './redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const ShoppingPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const [info, setInfo] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const dispatch = useDispatch();
    const handleCheckout = () => {
        navigate('/shopcheckout');
    };




    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://192.168.0.108:5000/items');
                setItems(response.data);
                setLoading(false);

                const uniqueCategories = ['All', ...new Set(response.data.map((item) => item.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleLocalQuantityChange = (id, increment) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + increment),
        }));
    };

    const handleQuantityChange = (item) => {
        const quantity = quantities[item.id] || 0;
        if (quantity === 0) {
            setInfo('Quantity cannot be 0');
            setOpenModal(true);
            return;
        }

        dispatch(addItem({ ...item, quantity }));
        setInfo('Successfully added to cart');
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setInfo('');
    };

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    const handleScrollCategory = (direction) => {
        const currentIndex = categories.indexOf(selectedCategory);
        if (direction === 'left' && currentIndex > 0) {
            setSelectedCategory(categories[currentIndex - 1]);
        } else if (direction === 'right' && currentIndex < categories.length - 1) {
            setSelectedCategory(categories[currentIndex + 1]);
        }
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    }

    if (items.length === 0) {
        return <Typography variant="h6" align="center" sx={{ mt: 4 }}>No items available to display</Typography>;
    }

    const filteredItems = selectedCategory === 'All' ? items : items.filter((item) => item.category === selectedCategory);

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
            key={item.id}
        >
            <CardMedia
                component="img"
                height="150"
                image={`/${item.image}`}
                alt={item.name}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: { xs: '0.9rem', color: 'black' } }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', color: 'gray' } }}>
                    Price: ${item.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.6rem', color: 'gray' } }}>
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
                        onClick={() => handleLocalQuantityChange(item.id, -1)}
                    >
                        <Remove sx={{ fontSize: '0.8rem', color: 'black' }} />
                    </IconButton>
                    <TextField
                        value={quantities[item.id] || 0}
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

    return (
        <Box
            sx={{
                paddingBottom: 20,
                paddingTop: 13,
                paddingX: {xs: 2, sm: 8, md: 5, lg: 9, xl: 15},
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            {/* Add the header content */}
            <Box sx={{paddingTop: 4, textAlign: 'center'}}>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.warning.dark,
                        fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem'},
                    }}
                >
                    Discover Our Latest Collection
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.primary,
                        marginTop: 2,
                        fontSize: {xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem', xl: '1.8rem'},
                    }}
                >
                    - Made for you, crafted with love -
                </Typography>
            </Box>
            <br/><br/>
            {/* 类别选择滑动栏 */}
            {categories.length > 1 && (
                <Box sx={{display: 'center', alignItems: 'center', marginBottom: 0,justifyContent: 'center',
                    }}>
                    <IconButton
                        onClick={() => handleScrollCategory('left')}
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {color: theme.palette.primary.dark},
                            fontSize: '2rem',
                            padding: '8px',
                        }}
                    >
                        <ArrowBackIos/>
                    </IconButton>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            flexGrow: 1,
                            maxWidth: {xs: '70%', md: '70%', lg: '70%', xl: '60%'},
                            borderRadius: '8px',
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            '& .MuiTab-root': {
                                minWidth: '100px',
                                padding: '12px',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            },
                            '& .Mui-selected': {
                                color: theme.palette.primary.main,
                                fontWeight: 'bold',
                                backgroundColor: theme.palette.action.selected,
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: theme.palette.primary.main,
                                height: '6px',
                            },

                        }}
                    >
                        {categories.map((category) => (
                            <Tab key={category} label={category} value={category}/>
                        ))}
                    </Tabs>
                    <IconButton
                        onClick={() => handleScrollCategory('right')}
                        sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {color: theme.palette.primary.dark},
                            fontSize: '2rem',
                            padding: '8px',
                        }}
                    >
                        <ArrowForwardIos/>
                    </IconButton>
                </Box>
            )}

            {/* Display filtered items in a grid */}
            <Grid container spacing={4} sx={{padding: {sm: 3, md: 5, lg: 9, xl: 20}, marginTop: 4}}>
                {filteredItems.map((item) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={item.id}>
                        {renderCard(item)}
                    </Grid>
                ))}
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 4,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 4,
                    }}
                >
                    <Button
                        onClick={handleCheckout}
                        variant="contained"
                        color="primary"
                        sx={{
                            display: 'flex',
                            padding: '10px 20px',
                            borderRadius: '30px', // 圆角按钮
                            backgroundColor: '#ff9100', // 默认背景颜色
                            color: '#000000', // 文本颜色
                            fontSize: '16px',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // 初始阴影
                            transition: 'all 0.3s ease', // 添加过渡效果
                            '&:hover': {
                                backgroundColor: '#ffbc37', // 悬停时的背景颜色
                                transform: 'scale(1.05)', // 悬停时稍微放大
                                boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.3), 0px 4px 20px rgba(0, 153, 255, 0.2), 0px 4px 25px rgba(0, 255, 127, 0.2)', // 更小且更柔和的彩色阴影
                            },
                            '&:active': {
                                backgroundColor: '#ffc854', // 点击时的背景颜色
                                transform: 'scale(0.95)', // 点击时缩小
                            },
                        }}
                    >
                        Check Out in 3 Easy Steps
                    </Button>
                </Box>


            </Box>



            {/* Modal for notifications */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {xs: 280, sm: 350, md: 400, lg: 500},
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
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            fontSize: {xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem'},
                        }}
                    >
                        {info}
                    </Typography>
                    <Button
                        onClick={handleCloseModal}
                        sx={{mt: 2}}
                        variant="contained"
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ShoppingPage;
