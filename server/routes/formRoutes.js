const express = require("express");
const upload = require("../middleware/upload");
const { submitForm, getAllApplications, getUserApplications } = require("../controllers/formController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

// Public: Submit a new membership application
router.post(
    "/apply",
    upload.fields([
        { name: "nomineeLetter", maxCount: 1 },
        { name: "registrationCertificate", maxCount: 1 }
    ]),
    submitForm
);

// Admin only: Fetch all applications
router.get("/all", verifyToken, verifyAdmin, getAllApplications);

// Authenticated user: Fetch only their own applications
router.get("/user/:email", verifyToken, getUserApplications);

module.exports = router;
