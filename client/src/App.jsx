import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

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
import './styles/toast.css';

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
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
            <Footer />
            <ToastContainer position="top-right" autoClose={4000} limit={3} theme="light" pauseOnHover />
        </>
    );
}

export default App;
