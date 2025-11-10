const MembershipApplication = require("../models/MembershipApplication");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.submitForm = async (req, res) => {
    try {
        if (!req.body.data) {
            return res.status(400).json({ error: "Missing form data" });
        }

        let data;
        try {
            data = JSON.parse(req.body.data);
        } catch (err) {
            console.error("❌ JSON parse error:", err.message);
            return res.status(400).json({ error: "Invalid JSON in request" });
        }

        // Upload nominee letter and registration certificate to Cloudinary
        let nomineeUrl = "";
        let certUrl = "";

        if (req.files?.nomineeLetter?.[0]) {
            const result = await cloudinary.uploader.upload(req.files.nomineeLetter[0].path, {
                folder: "gims/nomineeLetters"
            });
            nomineeUrl = result.secure_url;
            fs.unlinkSync(req.files.nomineeLetter[0].path); // cleanup local
        }

        if (req.files?.registrationCertificate?.[0]) {
            const result = await cloudinary.uploader.upload(req.files.registrationCertificate[0].path, {
                folder: "gims/certificates"
            });
            certUrl = result.secure_url;
            fs.unlinkSync(req.files.registrationCertificate[0].path);
        }

        const newApp = new MembershipApplication({
            ...data,
            nominee_letter: nomineeUrl,
            certificate_of_registration: certUrl
        });

        await newApp.save();
        res.status(201).json({ message: "Application submitted successfully" });

    } catch (err) {
        console.error("❌ Submission Error:", err.message);
        res.status(500).json({ error: "Submission failed" });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await MembershipApplication.find().sort({ submitted_at: -1 });
        res.status(200).json(applications);
    } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        res.status(500).json({ error: "Failed to fetch applications" });
    }
};
