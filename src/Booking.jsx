import React, { useState, useRef } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, Grid, Tabs, Tab, Divider, useMediaQuery, Card, Drawer, CssBaseline } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";


const categories = [
    { id: 'monday-promotion', name: "Monday - Friday Promotion" },
    { id: 'set-color', name: "Set Color" },
    { id: 'head-spa', name: "Japanese Head Spa" },
    { id: 'hair-color', name: "Men / Women's Hair Colour" },
];

const servicesData = {
    'monday-promotion': [
        { id: 1, name: "Hair cut + Shiseido hair treatment", description: "1 hr · Female only · Monday to Friday Happy hour", price: 99, duration: 60 },
        { id: 2, name: "Single color + Shiseido Ultrasonic Treatment", description: "1 hr, 30 mins · Single color · Female only", price: 165, duration: 90 },
    ],
    'set-color': [
        { id: 3, name: "1 time bleach + color + Shishido treatment", description: "3 hrs, 30 mins · Female only", price: 350, duration: 210 },
    ],
    'head-spa': [
        { id: 4, name: "Relaxing Japanese Head Spa", description: "1 hr · Includes scalp massage and treatment", price: 120, duration: 60 },
    ],
    'hair-color': [
        { id: 5, name: "Men's Hair Color", description: "45 mins · Includes color consultation", price: 70, duration: 45 },
    ]
};

const Booking = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const categoryRefs = categories.reduce((acc, category) => {
        acc[category.id] = useRef(null);
        return acc;
    }, {});

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        const categoryId = categories[newValue].id;
        categoryRefs[categoryId].current.scrollIntoView({ behavior: 'smooth' });
    };

    const addService = (service) => {
        if (selectedServices.includes(service.id)) {
            setSelectedServices(selectedServices.filter(id => id !== service.id));
        } else {
            setSelectedServices([...selectedServices, service.id]);
        }
    };

    const totalAmount = selectedServices.reduce((total, serviceId) => {
        const service = Object.values(servicesData).flat().find(s => s.id === serviceId);
        return total + service.price;
    }, 0);

    const totalDuration = selectedServices.reduce((total, serviceId) => {
        const service = Object.values(servicesData).flat().find(s => s.id === serviceId);
        return total + service.duration;
    }, 0);

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} hr${hours > 1 ? 's' : ''} ${mins > 0 ? ` ${mins} min${mins > 1 ? 's' : ''}` : ''}`;
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    const handleContinue = () => {
        const selectedServiceDetails = selectedServices.map(serviceId =>
            Object.values(servicesData).flat().find(service => service.id === serviceId)
        );

        navigate('/Checkout', {
            state: {
                selectedServices: selectedServiceDetails,
                totalAmount,
                totalDuration
            }
        });
    };


    return (
        <>
        <ResponsiveAppBar />
            <Box
                sx={{
                    paddingTop: '5rem',
                    paddingX: 3, // 左右方向的 padding
                    paddingBottom: 3, // 底部的 padding
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    maxWidth: '100%',
                    overflowX: 'hidden',
                    backgroundColor: theme.palette.background.default
                }}
            >

            {/* 左边：服务类别和服务列表 */}
            <Box flex={isMobile ? 1 : 0.7} p={isMobile ? 0.05 : 2} sx={{ overflowY: 'auto', maxHeight: '90vh', maxWidth: '90vw', overflowX: 'hidden' }}>
                <Typography variant="h5" mb={2} fontWeight="bold">Select services</Typography>

                {/* 类别的滑动菜单 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, maxWidth: '100%' }}>
                    <IconButton onClick={() => setSelectedTab((prev) => Math.max(prev - 1, 0))}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ flexGrow: 1, '.MuiTab-root': { minWidth: 'auto', fontSize: '1rem' } }}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: theme.palette.primary.main,
                                height: 4,
                            }
                        }}
                    >
                        {categories.map((category) => (
                            <Tab key={category.id} label={category.name} />
                        ))}
                    </Tabs>
                    <IconButton onClick={() => setSelectedTab((prev) => Math.min(prev + 1, categories.length - 1))}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>

                {/* 服务清单 */}
                {categories.map((category) => (
                    <Box key={category.id} ref={categoryRefs[category.id]} mb={4} sx={{ maxWidth: '100%' }}>
                        <Typography variant="h6" fontWeight="bold">{category.name}</Typography>
                        <List sx={{ maxWidth: '100%' }}>
                            {servicesData[category.id].map((service) => (
                                <Card key={service.id} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)' } }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={9}>
                                            <ListItemText
                                                primary={service.name}
                                                secondary={`${service.description} from $${service.price}`}
                                            />
                                        </Grid>
                                        <Grid item xs={3} display="flex" justifyContent="flex-end">
                                            <IconButton onClick={() => addService(service)}>
                                                {selectedServices.includes(service.id) ? <CheckIcon color="primary" /> : <AddIcon />}
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>

            {/* 右边：已选择服务和总价 */}
            {!isMobile && (
                <Box
                    flex={0.3}
                    p={2}
                    sx={{
                        borderLeft: `1px solid ${theme.palette.divider}`, // 动态边框颜色
                        backgroundColor: theme.palette.background.paper,  // 动态背景颜色
                        borderRadius: '16px',
                        maxWidth: '100%'
                    }}
                >

                <Typography variant="h6" fontWeight="bold">Selected Services</Typography>
                    {selectedServices.length === 0 ? (
                        <Typography>No services selected</Typography>
                    ) : (
                        <List>
                            {selectedServices.map((serviceId) => {
                                const service = Object.values(servicesData).flat().find(s => s.id === serviceId);
                                return (
                                    <ListItem key={service.id}>
                                        <ListItemText primary={service.name} secondary={`$${service.price} · ${formatDuration(service.duration)}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6">Total: ${totalAmount}</Typography>
                    <Typography variant="body1" color="textSecondary">Total Duration: {formatDuration(totalDuration)}</Typography>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleContinue}>
                        Continue
                    </Button>
                </Box>
            )}

            {/* 手机端：总价和总时长 + 展开箭头 */}
            {isMobile && (
                <>
                    <Box sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                        zIndex: 1000
                    }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="body1">Total: ${totalAmount}</Typography>
                            <Typography variant="body1">Duration: {formatDuration(totalDuration)}</Typography>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            endIcon={<ExpandLessIcon />}
                            onClick={handleDrawerOpen}
                            sx={{ mt: 1, transition: 'all 0.3s', '&:hover': { backgroundColor: theme.palette.primary.dark } }}
                        >
                            Continue
                        </Button>
                    </Box>

                    <Drawer
                        anchor="bottom"
                        open={drawerOpen}
                        onClose={handleDrawerClose}
                        PaperProps={{ sx: { maxHeight: '60%' } }}
                    >
                        <Box p={2}>
                            <Typography variant="h6" fontWeight="bold">Selected Services</Typography>
                            {selectedServices.length === 0 ? (
                                <Typography>No services selected</Typography>
                            ) : (
                                <List>
                                    {selectedServices.map((serviceId) => {
                                        const service = Object.values(servicesData).flat().find(s => s.id === serviceId);
                                        return (
                                            <ListItem key={service.id}>
                                                <ListItemText primary={service.name} secondary={`$${service.price} · ${formatDuration(service.duration)}`} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6">Total: ${totalAmount}</Typography>
                            <Typography variant="body1" color="textSecondary">Total Duration: {formatDuration(totalDuration)}</Typography>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleDrawerClose}>
                                Close
                            </Button>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleContinue}>
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </Drawer>
                </>
            )}
        </Box>
        </>
    );
};

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            background: {
                default: prefersDarkMode ? '#121212' : '#f5f5f5',
                paper: prefersDarkMode ? '#1e1e1e' : '#fff',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            button: {
                textTransform: 'none', // Prevent all-caps buttons
            },
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px',
                    },
                },
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Booking />
        </ThemeProvider>
    );
};

export default App;
