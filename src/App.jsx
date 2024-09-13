import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./MainPage.jsx";
import Welcome from "./Welcome.jsx";
import EmailList from "./EmailList.jsx";
import About from "./About.jsx";
import VideoShow from "./VideoShow.jsx";
import About2 from "./About2.jsx";
import Zitzroy from "./Zitzroy.jsx";
import Review from "./Review.jsx";
import Footer from "./Footer.jsx";
import Shopping from "./Shopping.jsx";
import Map from "./Map.jsx";
import Booking from "./Booking.jsx";
import Checkout from './Checkout.jsx';
import Result from "./Result.jsx";
import ContactForm from "./ContactForm.jsx";
import ServiceMenu from "./ServiceMenu.jsx";
import ResponsiveAppBar from './ResponsiveAppBar'; // Import Navigation Bar
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';  // Import Redux Store
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import FAQPage from "./FAQPage.jsx";

function App() {
    const mode = useSelector((state) => state.theme.mode); // Get Redux mode

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
            <Router>
                <ResponsiveAppBar />
                <Routes>
                    <Route path="/" element={<MainPageWithComponents />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="/services" element={<ServiceMenu />} />
                    <Route path="/faq" element={<FAQPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

// 提取出的主页内容
const MainPageWithComponents = () => (
    <div className="welcomeClass">
        <MainPage />
        <Welcome />
        <EmailList />
        <Map />
        <Shopping />
        <About />
        <VideoShow />
        <About2 />
        <Zitzroy />
        <Review />
        <Footer />
    </div>
);

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
