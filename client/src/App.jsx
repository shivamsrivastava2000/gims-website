import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ApplyPage from './pages/ApplyPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import ThankYou from './pages/ThankYou';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </>
    );
}

export default App;
