import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./home.jsx"
import MainPage from "./MainPage.jsx";
import Welcome from "./Welcome.jsx"
import EmailList from "./EmailList.jsx"
import About from "./About.jsx"
import VideoShow from "./VideoShow.jsx"
import "./Welcome.css"
import About2 from "./About2.jsx"
import Zitzroy from "./Zitzroy.jsx"
import Review from "./Review.jsx"
import Footer from "./Footer.jsx"
import Shopping from "./Shopping.jsx"
import Map from "./Map.jsx"
import Booking from "./Booking.jsx";
import Checkout from './Checkout.jsx';
import Result from "./Result.jsx"
import ContactForm from "./ContactForm.jsx";
import ServiceMenu from "./ServiceMenu.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* 主页的路由，包含所有其他组件 */}
                <Route
                    path="/"
                    element={
                        <div className="welcomeClass">
                            <Home />
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
                    }
                />

                {/* Booking 组件单独放在 /booking 页面 */}
                <Route path="/booking" element={<Booking />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/result" element={<Result />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/services" element={<ServiceMenu />} />
            </Routes>
        </Router>
    );
}

export default App;