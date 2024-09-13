import React, {useState, useRef, useEffect} from "react";
import {Tabs, Tab, Box, Typography, Container, IconButton, Divider, Button} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import LoadingSpinnerWithRandomSpeed from "./LoadingSpinner.jsx";

// Classification and service data
const services = {
    women: [
        { name: "Haircut", price: "From $35" },
        { name: "Wash & Blowdry", price: "From $40" },
        { name: "Wash, Cut & Blowdry", price: "From $55" },
        { name: "Treatment", price: "From $40" },
        { name: "Colour", price: "From $65" },
        { name: "Cut & Colour", price: "From $90" },
        { name: "Half Head Foils", price: "From $90" },
        { name: "Full Head Foils", price: "From $180" },
        { name: "Perm", price: "From $120" },
        { name: "Digital Curling", price: "From $200" },
        { name: "Permanent Straightening", price: "From $200" },
    ],
    mens: [
        { name: "Cut", price: "From $30" },
        { name: "Buzz Cut", price: "From $20" },
        { name: "Fade", price: "From $45" },
        { name: "Wash & Cut", price: "From $50" },
        { name: "Colour", price: "From $70" },
        { name: "Cut & Colour", price: "From $70" },
        { name: "Cap Highlights", price: "From $90" },
        { name: "Digital Curling", price: "From $150" },
    ],
    waxing: [
        { name: "Eyebrows", price: "From $20" },
        { name: "Lip & Chin", price: "From $20" },
        { name: "Underarm", price: "From $25" },
        { name: "Full Face", price: "From $45" },
        { name: "Half Arm", price: "From $30" },
        { name: "Full Arm", price: "From $40" },
        { name: "Half Leg", price: "From $30" },
        { name: "Full Leg", price: "From $45" },
        { name: "Brazilian", price: "From $50" },
        { name: "Bikini", price: "From $40" },
    ],
    nails: [
        { name: "Manicure w Colour", price: "From $25" },
        { name: "Pedicure w Colour", price: "From $35" },
        { name: "Both w Colour", price: "From $55" },
        { name: "Manicure w Shellac", price: "From $35" },
        { name: "Pedicure w Shellac", price: "From $45" },
        { name: "Both w Shellac", price: "From $75" },
        { name: "Pedicure Natural Extra", price: "From $25" },
    ],
    sns: [
        { name: "SNS Overlay", price: "From $45" },
        { name: "SNS Full Set w Tips", price: "From $50" },
        { name: "SNS Full Set w French", price: "From $55" },
        { name: "SNS Pedicure", price: "From $55" },
        { name: "SNS Refills", price: "From $45" },
        { name: "SNS Full Set (Pink & White)", price: "From $60" },
    ],
    acrylic: [
        { name: "Acrylic Full Set w Colour", price: "From $50" },
        { name: "Acrylic Full Set w French", price: "From $55" },
        { name: "Acrylic Full Set w Shellac", price: "From $55" },
        { name: "Acrylic Full Set w Pedicure", price: "From $55" },
        { name: "Acrylic Refills", price: "From $40" },
        { name: "Soak Removal", price: "From $20" },
    ],
    other: [
        { name: "Kids Cut", price: "From $25" },
        { name: "Eyebrow Tint", price: "From $20" },
        { name: "Eyelash Tint", price: "From $20" },
        { name: "Hair Extensions (Consultation)", price: "$280 to $400" },
    ]
};

// Category name display
const tabLabels = {
    women: "WOMEN",
    mens: "MENS",
    waxing: "WAXING",
    nails: "NAILS",
    sns: "SNS",
    acrylic: "ACRYLIC",
    other: "OTHER SERVICES"
};



const ServiceMenu = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [loading, setLoading] = useState(true);

    const handleBookingClick = () => {
        navigate('/booking'); // Navigate to /booking when button is clicked
    };
    const [selectedTab, setSelectedTab] = useState("women");
    const tabsRef = useRef(null);
    const theme = useTheme();

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Stop the loading animation after 3 seconds

        return () => clearTimeout(timer); // Clear the timer
    }, []);

    if (loading) {
        return <LoadingSpinnerWithRandomSpeed />;
    }

    // Handle switching categories when clicking the left or right arrow
    const handleScroll = (direction) => {
        const tabKeys = Object.keys(services); // Get all the category keys (e.g. "women", "mens", etc.)
        const currentIndex = tabKeys.indexOf(selectedTab); // Get the index of the currently selected Tab
        let newIndex;

        if (direction === "left") {
            // If you scroll to the left, switch to the previous category.
            // If it is already the first one, return to the last one.
            newIndex = currentIndex === 0 ? tabKeys.length - 1 : currentIndex - 1;
        } else {
            // If you scroll right, switch to the next category,
            // if it is the last one, return to the first one
            newIndex = currentIndex === tabKeys.length - 1 ? 0 : currentIndex + 1;
        }

        setSelectedTab(tabKeys[newIndex]); // Set new selection Tab
    };

    return (
        <Box
            sx={{
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                    : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
                minHeight: '100vh',
                padding: '20px'
            }}
        >
            <ResponsiveAppBar />
            <Container maxWidth="md" sx={{ paddingBottom: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        letterSpacing: '0.1rem',
                        paddingTop:"5vh",
                        marginTop: 4,
                        color: theme.palette.text.primary,
                        textShadow: theme.palette.mode === 'dark'
                            ? '2px 2px 5px rgba(0, 0, 0, 0.3)'
                            : '1px 1px 3px rgba(255, 255, 255, 0.8)'
                    }}
                >
                    SERVICE MENU
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <IconButton
                        onClick={() => handleScroll("left")}
                        sx={{
                            marginRight: 1,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '50%',
                            padding: '8px',
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0px 2px 10px rgba(0, 0, 0, 0.5)'
                                : '0px 2px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <Box
                        ref={tabsRef}
                        sx={{
                            flexGrow: 1,
                            overflowX: 'auto',
                            display: 'flex',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                        }}
                    >
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="Service categories"
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{
                                backgroundColor: theme.palette.background.default,
                                borderRadius: '8px',
                                flexGrow: 1,
                                minHeight: '48px',
                                display: 'flex',
                                '& .MuiTab-root': {
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }
                            }}
                        >
                            <Tab label="WOMEN" value="women" />
                            <Tab label="MENS" value="mens" />
                            <Tab label="WAXING" value="waxing" />
                            <Tab label="NAILS" value="nails" />
                            <Tab label="SNS" value="sns" />
                            <Tab label="ACRYLIC" value="acrylic" />
                            <Tab label="OTHER SERVICES" value="other" />
                        </Tabs>
                    </Box>

                    <IconButton
                        onClick={() => handleScroll("right")}
                        sx={{
                            marginLeft: 1,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '50%',
                            padding: '8px',
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0px 2px 10px rgba(0, 0, 0, 0.5)'
                                : '0px 2px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>

                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        marginBottom: 3,
                        fontWeight: 'bold',
                        letterSpacing: '0.08rem',
                        color: theme.palette.text.primary,
                    }}
                >
                    {tabLabels[selectedTab]}
                </Typography>

                <Divider sx={{ marginBottom: 3, backgroundColor: theme.palette.divider }} />
                <Box
                    size="large"
                    sx={{
                        display: 'flex',
                        padding: 7,
                        justifyContent: 'center', // Horizontally center
                        alignItems: 'center',      // Vertically center
                        height: '10vh',           // Optional, to center the button vertically relative to the viewport height
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"

                        sx={{
                            backgroundColor: '#ff8000', // Gold color
                            color: '#000000',           // White text on the button
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            borderRadius: "3px",
                            fontSize: '1.2rem',
                            letterSpacing: '0.1rem',    // Adjust letter spacing here
                            "&:hover": {
                                backgroundColor: '#FFC107', // Slightly darker gold on hover
                                transform: 'scale(1.1)', // Slightly increase size on hover
                                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
                            },

                        }}
                        onClick={handleBookingClick}
                    >
                        Book now
                    </Button>
                </Box>



                <Box>
                    {services[selectedTab].map((service, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                padding: 2,
                                marginBottom: 2,
                                borderRadius: '8px',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0px 4px 10px rgba(0, 0, 0, 0.5)'
                                    : '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.5)',
                                    transform: 'scale(1.1)',
                                }
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {service.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                {service.price}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box
                    size="large"
                    sx={{
                        display: 'flex',
                        padding: 7,
                        justifyContent: 'center', // Horizontally center
                        alignItems: 'center',      // Vertically center
                        height: '10vh',           // Optional, to center the button vertically relative to the viewport height
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff8000', // Gold color
                            borderRadius: "3px",
                            color: '#000000',           // White text on the button
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            fontSize: '1.2rem',
                            letterSpacing: '0.1rem',    // Adjust letter spacing here
                            "&:hover": {
                                backgroundColor: '#FFC107', // Slightly darker gold on hover
                                transform: 'scale(1.1)', // Slightly increase size on hover
                                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
                            },

                        }}
                        onClick={handleBookingClick}
                    >
                        Book now in 3 easy steps
                    </Button>
                </Box>
            </Container>

        </Box>
    );
};

export default ServiceMenu;
