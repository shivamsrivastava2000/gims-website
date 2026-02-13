import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/*
  IMPORTANT:
  Ye config gims-auth Firebase project ka hai
  (jo tumne abhi Web App register kiya hai)
*/

const firebaseConfig = {
    apiKey: "AIzaSyB6Qu0Rfo6P5EMPG4LrlOhhxeTyM-1TcU0",
    authDomain: "gims-auth.firebaseapp.com",
    projectId: "gims-auth",
    storageBucket: "gims-auth.firebasestorage.app",
    messagingSenderId: "1092348675651",
    appId: "1:1092348675651:web:229f0565c0dd467347b6f6",
    measurementId: "G-RV8EG77YDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
