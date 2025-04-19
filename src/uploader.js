const { uploadImage } = require("./helpers/file");
const { getPresignedUrl, saveInvoice } = require("./helpers/api");
const { delay } = require("./utils");

async function uploadAndSaveOnce(AUTH_TOKEN, IMAGE_FILE) {
  try {
    const { presigned_url, key } = await getPresignedUrl(AUTH_TOKEN, IMAGE_FILE);

    await uploadImage(presigned_url, IMAGE_FILE);

    await saveInvoice(AUTH_TOKEN, key);
  } catch (error) {
    console.error("❌ ".red + "Error:", error.response?.data?.err_msg || error.message);

    if (error.response?.data?.err_code === 1000030 || error.message === "server error") {
      console.warn("⚠️ Retrying due to server error...".yellow);
      return await uploadAndSaveOnce(AUTH_TOKEN, IMAGE_FILE);
    }

    await delay(2000);
  }
}

module.exports = { uploadAndSaveOnce };
