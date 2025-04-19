const fs = require("fs");
const path = require("path");
const axios = require("axios");

const uploadImage = async (presignedUrl, IMAGE_FILE) => {
  const fileBuffer = fs.readFileSync(path.join(__dirname, "../../", IMAGE_FILE));
  await axios.put(presignedUrl, fileBuffer, {
    headers: { "Content-Type": "image/jpeg" },
  });
  console.log("✅ ".green + "Image uploaded successfully");
};

module.exports = { uploadImage };
