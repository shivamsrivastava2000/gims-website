import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [user, setUser] = useState(undefined); // undefined = loading

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, []);

    // Still loading auth state
    if (user === undefined) {
        return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Email not verified (skip for Google users who are auto-verified)
    if (!user.emailVerified) {
        return <Navigate to="/login" replace />;
    }

    // Admin-only route check
    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map(e => e.trim());
    if (adminOnly && !adminEmails.includes(user.email)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
