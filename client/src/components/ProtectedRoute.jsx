import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [user, setUser] = useState(undefined); // undefined = loading

    // Admin-only route check
    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map(e => e.trim());
    if (adminOnly && !adminEmails.includes(user.email)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
