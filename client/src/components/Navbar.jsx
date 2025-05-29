import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/Navbar.css';
import '../styles/Login.css'; // for .logout-button styling
import logo from '../assets/images/image12.png';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
        return () => unsub();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("✅ Logged out");
            navigate('/'); // 🔄 Redirects to homepage
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };


    const isAdmin = user?.email === 'shivamsrivastava126@gmail.com';

    return (
        <nav className={scrolled ? 'navbar navbar-scrolled' : 'navbar'}>
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="GIMS Startup" />
            </Link>

            <ul className="nav-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/apply">Apply</Link></li>

                {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                {user && <li><Link to="/dashboard">Dashboard</Link></li>}

                {user ? (
                    <li>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
