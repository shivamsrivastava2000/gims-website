import { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser?.emailVerified) {
                navigate('/dashboard');
            }
        });
        return () => unsub();
    }, [navigate]);

    const saveUserToBackend = async (firebaseUser) => {
        try {
            const token = await firebaseUser.getIdToken();
            await fetch(`${API_URL}/api/users/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || "No Name",
                }),
            });
        } catch (err) {
            console.error("Error saving user:", err);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                const userCred = await createUserWithEmailAndPassword(auth, email, pass);
                await sendEmailVerification(userCred.user);
                await saveUserToBackend(userCred.user);
                toast.success("✅ Signup successful! Verification email sent.");
            } else {
                const userCred = await signInWithEmailAndPassword(auth, email, pass);
                if (!userCred.user.emailVerified) {
                    toast.warn("📩 Please verify your email before logging in.");
                    return;
                }
                toast.success("✅ Login successful!");
                await saveUserToBackend(userCred.user);
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    const handleGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            if (!user.emailVerified) {
                toast.warn("📩 Please verify your email before logging in.");
                return;
            }
            await saveUserToBackend(user);
            toast.success("✅ Logged in with Google!");
            navigate('/dashboard');
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    const handleResetPassword = async () => {
        if (!email) return toast.warn("⚠️ Enter your email to reset password");
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("📩 Password reset email sent");
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    return (
        <div className="login-bg-wrapper">
            <div className="login-container">
                <div className="auth-toggle">
                    <h2>{isSignup ? 'Create an Account' : 'Welcome Back'}</h2>
                    <p>
                        {isSignup
                            ? 'Already a member? '
                            : "Don't have an account? "}
                        <span onClick={() => setIsSignup(!isSignup)} className="toggle-link">
                            {isSignup ? 'Log In' : 'Sign Up'}
                        </span>
                    </p>
                </div>

                <form onSubmit={handleEmailAuth} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />

                    <button type="submit" className="primary-btn">
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>

                    {!isSignup && (
                        <p className="forgot-link" onClick={handleResetPassword}>
                            Forgot Password?
                        </p>
                    )}
                </form>

                <div className="divider">OR</div>

                <button onClick={handleGoogle} className="google-btn">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
