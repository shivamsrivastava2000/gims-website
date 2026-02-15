const admin = require("../config/firebase");

const verifyAdmin = (req, res, next) => {
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());

    if (!req.user || !adminEmails.includes(req.user.email)) {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
