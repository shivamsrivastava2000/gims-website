// server/testCloudinary.js
const cloudinary = require("./config/cloudinary");

(async () => {
    try {
        const result = await cloudinary.uploader.upload(
            "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            { folder: "test" }
        );
        console.log("✅ Cloudinary Upload Successful:", result.secure_url);
    } catch (err) {
        console.error("❌ Cloudinary Error:", err.message);
    }
})();
