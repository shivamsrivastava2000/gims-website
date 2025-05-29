const express = require("express");
const upload = require("../middleware/upload");
const { submitForm, getAllApplications } = require("../controllers/formController");

const router = express.Router();

router.post(
    "/apply",
    upload.fields([
        { name: "nomineeLetter", maxCount: 1 },
        { name: "registrationCertificate", maxCount: 1 }
    ]),
    submitForm
);

// NEW: Admin route to fetch all applications
router.get("/all", getAllApplications);

module.exports = router;
