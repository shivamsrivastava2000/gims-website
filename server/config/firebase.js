const admin = require("firebase-admin");

// Initialize Firebase Admin with project ID from environment
// Using the default application credentials approach
admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "gims-bio",
});

module.exports = admin;
