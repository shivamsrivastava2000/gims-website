const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const formRoutes = require("./routes/formRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes"); // ✅ NEW

dotenv.config();
const app = express();

// Middleware
const allowedOrigins = [
    "https://bioincubator.gims.ac.in",
    "http://localhost:5173",
    "http://localhost:3000",
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working 🚀"));
app.get("/health", (req, res) => res.status(200).json({ status: "UP" }));

app.use("/api/forms", formRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes); // ✅ NEW

// MongoDB Connection + Server Start
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(process.env.PORT || 5000, () =>
            console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
        );
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
