import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC5JhBrIi4J-nBc4fztBok8trC2U6HdYAI",
    authDomain: "gims-bio.firebaseapp.com",
    projectId: "gims-bio",
    storageBucket: "gims-bio.appspot.com",
    messagingSenderId: "623938223674",
    appId: "1:623938223674:web:e827d11772e0fafbb63f03"
};

const app = initializeApp(firebaseConfig);

// ✅ Export for use in your login/signup components
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
