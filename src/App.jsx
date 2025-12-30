import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MegaMenu from './components/MegaMenu';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Main Pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Services from './pages/Services';

// --- NEW PAGES (Added) ---
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import PaymentPage from './pages/PaymentPage';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Services Sub-Pages
import CustomEngineering from './pages/services/CustomEngineering';
import LegacyModernization from './pages/services/LegacyModernization';
import StaffAugmentation from './pages/services/StaffAugmentation';

// About Sub-Pages
import MissionVision from './pages/about/MissionVision';
import OurDirector from './pages/about/OurDirector';
import LifeAtNeverDue from './pages/about/LifeAtNeverDue';
import BecomePartner from './pages/about/BecomePartner';
import UniversityProgram from './pages/about/UniversityProgram';

import './App.css'; // Make sure this import is here

function App() {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <div className="App">
            <ScrollToTop />
            {/* Navbar controls the activeMenu state */}
            <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

            {/* MegaMenu shows up when hovering specific items */}
            <MegaMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

            {/* Page Routing */}
            <div className="page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/payment/:id" element={<PaymentPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />

                    {/* --- NEW ROUTES (Added) --- */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />

                    {/* Services Sub-Routes */}
                    <Route path="/services/custom-engineering" element={<CustomEngineering />} />
                    <Route path="/services/legacy-modernization" element={<LegacyModernization />} />
                    <Route path="/services/staff-augmentation" element={<StaffAugmentation />} />

                    {/* About Sub-Routes */}
                    <Route path="/about/mission-vision" element={<MissionVision />} />
                    <Route path="/about/our-director" element={<OurDirector />} />
                    <Route path="/about/life-at-neverdue" element={<LifeAtNeverDue />} />
                    <Route path="/about/become-partner" element={<BecomePartner />} />
                    <Route path="/about/university-program" element={<UniversityProgram />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;