import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (currentUser.emailVerified) {
                    setUser(currentUser);
                    await fetchUserForms(currentUser.email);
                } else {
                    toast.warn("📩 Please verify your email to access dashboard");
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
            setLoading(false);
        });

        return () => unsub();
    }, [navigate]);

    const fetchUserForms = async (email) => {
        try {
            const res = await fetch('http://localhost:5000/api/forms/all');
            const data = await res.json();
            const userForms = data.filter((form) => form.email === email);
            setForms(userForms);
        } catch (err) {
            console.error("Error fetching forms:", err.message);
        }
    };

    if (loading) return <div className="dashboard-loading">Loading your dashboard...</div>;

    const latestForm = forms.length
        ? new Date(
            forms.reduce((latest, form) =>
                new Date(form.submitted_at) > new Date(latest.submitted_at) ? form : latest
            ).submitted_at
        ).toLocaleDateString()
        : "No submissions yet";

    return (
        <div className="dashboard-container">
            <div className="dashboard-heading">
                <h2>👋 Welcome, {user?.email}</h2>
                <p>Your UID: {user?.uid}</p>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>{forms.length}</h3>
                    <p>Total Submissions</p>
                </div>
                <div className="metric-card">
                    <h3>{latestForm}</h3>
                    <p>Last Submission</p>
                </div>
            </div>

            {forms.length > 0 && (
                <div className="form-summary">
                    <h3>📥 Your Submissions</h3>
                    <ul>
                        {forms.map((f, i) => (
                            <li key={i}>
                                <strong>{f.name_of_incubator}</strong> - {new Date(f.submitted_at).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
