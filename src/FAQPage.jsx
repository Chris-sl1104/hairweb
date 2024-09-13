import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingSpinnerWithRandomSpeed from "./LoadingSpinner.jsx";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const faqData = [
    {
        question: "What is your return policy?",
        answer: "You can return any item within 30 days of purchase. Please ensure that the product is unused and in its original packaging."
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping usually takes 5-7 business days. Expedited shipping options are available at checkout."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping to select countries. Shipping costs and delivery times vary depending on the destination."
    },
    {
        question: "How can I track my order?",
        answer: "After placing your order, you will receive an email with a tracking link. You can use this link to track your order in real-time."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, American Express, PayPal, and various other major credit cards."
    }
];

const FAQPage = () => {
    const navigate = useNavigate();
    const handleBookNow = () => {
        navigate('/booking');
    };

    const handleShopNow = () => {
        navigate('/shopping');  // Navigate to "/shopping" when the button is clicked
    };
    const theme = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Stop the loading animation after 3 seconds

        return () => clearTimeout(timer); // Clear the timer
    }, []);

    if (loading) {
        return <LoadingSpinnerWithRandomSpeed />;
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                paddingTop: "7rem",
                paddingBottom: "5rem",
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to bottom, #2c3e50, #34495e)'
                    : 'linear-gradient(to bottom, #ecf0f1, #bdc3c7)',
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{
                    fontSize: {
                        xs: '2rem',
                        sm: '2.5rem',
                        md: '3.5rem',
                        lg: '4.5rem',
                        xl: '5.5rem',
                    },
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    marginBottom: "2rem"
                }}
            >
                Frequently Asked Questions
            </Typography>

            <Box
                sx={{
                    maxWidth: "700px",
                    width: "100%",
                    marginBottom: 4,
                    justifyContent: "center",
                    padding: 2,
                }}
            >
                {faqData.map((item, index) => (
                    <Accordion
                        key={index}
                        sx={{
                            marginBottom: "1rem",
                            borderRadius: "4px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.05)",
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography variant="h6">{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{item.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>


            {/* Button part */}
            <Box sx={{ marginTop: 4, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{
                        padding: '12px 24px',
                        fontSize: '1.2rem',
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'warning.dark',
                            transform: 'scale(1.05)',
                            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                    onClick={handleBookNow}  // Triggering navigation function
                >
                    Book Now
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{
                        padding: '12px 24px',
                        fontSize: '1.2rem',
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'warning.dark',
                            transform: 'scale(1.05)',
                            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                    onClick={handleShopNow}  // Triggering navigation function
                >
                    Shop Now
                </Button>
            </Box>

        </Container>
    );
};

export default FAQPage;
