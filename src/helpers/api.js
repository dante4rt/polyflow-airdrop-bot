const axios = require("axios");
const getHeaders = require("../config");

const getPresignedUrl = async (AUTH_TOKEN, IMAGE_FILE) => {
  const { data } = await axios.get(
    `https://api-v2.polyflow.tech/api/scan2earn/get_presigned_url?file_name=${IMAGE_FILE}`,
    { headers: getHeaders(AUTH_TOKEN) }
  );
  return data.msg;
};

const saveInvoice = async (AUTH_TOKEN, key) => {
  const response = await axios.post(
    "https://api-v2.polyflow.tech/api/scan2earn/save_invoice",
    { invoice_path: key },
    { headers: getHeaders(AUTH_TOKEN) }
  );

  if (!response.data.success && response.data.err_code === 1000030) {
    console.warn("⚠️ Server error, retrying...".yellow);
    return await saveInvoice(AUTH_TOKEN, key);
  }

  console.log("✅ ".green + `Invoice saved: ${key}`);
  console.log(`🏅 Points: ${response.data.msg?.my_point ?? "N/A"}`.cyan);
  console.log(`✅ Success: ${response.data.success}`.green);
};

module.exports = { getPresignedUrl, saveInvoice };
