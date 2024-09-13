import React, {useState, useRef, useEffect} from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, Grid, Tabs, Tab, Divider, useMediaQuery, Card, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useLocation, useNavigate} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import LoadingSpinnerWithRandomSpeed from "./LoadingSpinner.jsx";


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
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // Initialize an empty object with useRef
    const categoryRefs = useRef({});
    useEffect(() => {
        // Initialize each category’s ref
        categories.forEach(category => {
            if (!categoryRefs.current[category.id]) {
                categoryRefs.current[category.id] = React.createRef();
            }
        });
    }, []); // It only needs to be executed once when the component is initialized.
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Stop the loading animation after 3 seconds

        return () => clearTimeout(timer); // Clear the timer
    }, []);

    if (loading) {
        return <LoadingSpinnerWithRandomSpeed />;
    }

    /*const categoryRefs = categories.reduce((acc, category) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        acc[category.id] = useRef(null);
        return acc;
    }, {});*/

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
        <Box
            sx={{
                paddingTop: '5rem',
                paddingX: 3,
                paddingBottom: 3,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                maxWidth: '100%',
                overflowX: 'hidden',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                    : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
            }}
        >
            {/* Left side: Service categories and service list */}
            <Box flex={isMobile ? 1 : 0.7} p={isMobile ? 0.05 : 2} sx={{ overflowY: 'auto', maxHeight: '90vh', maxWidth: '90vw', overflowX: 'hidden' }}>
                <Typography variant="h5" mb={2} color="text.primary" fontWeight="bold">
                    Select services
                </Typography>

                {/* Scrollable menu for categories */}
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

                {/* Service list */}
                {categories.map((category) => (
                    <Box key={category.id} ref={categoryRefs[category.id]} mb={4} sx={{ maxWidth: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">{category.name}</Typography>
                        <List sx={{ maxWidth: '100%' }}>
                            {servicesData[category.id].map((service) => (
                                <Card key={service.id} sx={{
                                    mb: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.03)',
                                        backgroundColor: theme.palette.warning.light,
                                        boxShadow: '0 10px 20px rgba(255,153,18, 0.5)',
                                    },
                                    backgroundColor: theme.palette.background.paper,
                                    color: theme.palette.text.primary
                                }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={9}>
                                            <ListItemText
                                                primary={service.name}
                                                secondary={`${service.description} from $${service.price}`}
                                                primaryTypographyProps={{ color: theme.palette.text.primary }}
                                                secondaryTypographyProps={{ color: theme.palette.text.secondary }}
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

            {/* Right side: Selected services and total amount */}

            {!isMobile && (
                <Box
                    flex={0.3}
                    p={2}
                    sx={{
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(to bottom, #1f2a36, #2a3d52)'  // Slightly darker for dark mode
                            : 'linear-gradient(to bottom, #d0d6da, #a7b0b8)',  // Slightly darker for light mode

                        borderRadius: '16px',
                        maxWidth: '100%'
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="text.primary">Selected Services</Typography>
                    {selectedServices.length === 0 ? (
                        <Typography color="text.primary">No services selected</Typography>
                    ) : (
                        <List>
                            {selectedServices.map((serviceId) => {
                                const service = Object.values(servicesData).flat().find(s => s.id === serviceId);
                                return (
                                    <ListItem key={service.id}>
                                        <ListItemText
                                            primary={service.name}
                                            secondary={`$${service.price} · ${formatDuration(service.duration)}`}
                                            primaryTypographyProps={{ color: theme.palette.text.primary }}
                                            secondaryTypographyProps={{ color: theme.palette.text.secondary }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" color="text.primary">Total: ${totalAmount}</Typography>
                    <Typography variant="body1" color="text.secondary">Total Duration: {formatDuration(totalDuration)}</Typography>
                    <Button variant="contained" color="warning" fullWidth
                            sx={{ mt: 2,
                                '&:hover': { transform: 'scale(1.05)',
                                    backgroundColor: theme.palette.warning.main,
                                    boxShadow: '0 10px 20px rgba(255,153,18, 0.7)',
                                },
                    }} onClick={handleContinue}>
                        Continue
                    </Button>
                </Box>
            )}

            {/* Mobile version: total amount and total duration + expand arrow */}
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
                            <Typography variant="body1" color="text.primary">Total: ${totalAmount}</Typography>
                            <Typography variant="body1" color="text.primary">Duration: {formatDuration(totalDuration)}</Typography>
                        </Grid>
                        <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            endIcon={<ExpandLessIcon />}
                            onClick={handleDrawerOpen}
                            sx={{ mt: 1, transition: 'all 0.3s', '&:hover': { backgroundColor: theme.palette.warning.dark } }}
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
                            <Typography variant="h6" fontWeight="bold" color="text.primary">Selected Services</Typography>
                            {selectedServices.length === 0 ? (
                                <Typography color="text.primary">No services selected</Typography>
                            ) : (
                                <List>
                                    {selectedServices.map((serviceId) => {
                                        const service = Object.values(servicesData).flat().find(s => s.id === serviceId);
                                        return (
                                            <ListItem key={service.id}>
                                                <ListItemText
                                                    primary={service.name}
                                                    secondary={`$${service.price} · ${formatDuration(service.duration)}`}
                                                    primaryTypographyProps={{ color: theme.palette.text.primary }} // Dynamic font color
                                                    secondaryTypographyProps={{ color: theme.palette.text.secondary }} // Dynamic secondary text color
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" color="text.primary">Total: ${totalAmount}</Typography>
                            <Typography variant="body1" color="text.secondary">Total Duration: {formatDuration(totalDuration)}</Typography>
                            <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 ,
                                '&:hover': { transform: 'scale(1.03)',
                                    backgroundColor: theme.palette.warning.main,
                                }}}
                                    onClick={handleDrawerClose}>
                                Close
                            </Button>
                            <Button variant="contained" color="warning" fullWidth
                                    sx={{ mt: 2 ,
                                        '&:hover': { transform: 'scale(1.03)',
                                            backgroundColor: theme.palette.warning.main,
                                        }}}
                                        onClick={handleContinue}>
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </Drawer>
                </>
            )}
        </Box>
    );
};

export default Booking;
