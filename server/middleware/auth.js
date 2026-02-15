const admin = require("../config/firebase");

/**
 * Middleware to verify Firebase ID token from Authorization header.
 * Sets req.user with decoded token data (uid, email, etc.)
 */
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

/**
 * Middleware to check if the authenticated user is the admin.
 * Must be used AFTER verifyToken.
 */
const verifyAdmin = (req, res, next) => {
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());

    if (!req.user || !adminEmails.includes(req.user.email)) {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
