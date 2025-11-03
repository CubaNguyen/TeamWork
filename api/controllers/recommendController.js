const axios = require("axios");
const Product = require("../models/Product");
const Category = require("../models/Category");
const FormData = require("form-data");
require("dotenv").config();

const AI_URL = process.env.AI_URL || "http://localhost:8000";
exports.recommend = async (req, res) => {
  try {
    const file =
      (req.files?.file && req.files.file[0]) ||
      (req.files?.byImage && req.files.byImage[0]) ||
      req.file; // phòng khi bạn đổi lại upload.single("file")

    console.log(
      "File nhận được:",
      !!file,
      file?.fieldname,
      file?.originalname,
      file?.mimetype,
      file?.size
    );
    if (!file) {
      return res.status(400).json({
        error: "Missing file",
        hint: "Gửi multipart/form-data với field 'file' (hoặc 'byImage')",
        contentType: req.headers["content-type"],
        bodyKeys: Object.keys(req.body || {}),
      });
    }
    const formData = new FormData();
    // append buffer đúng cách
    formData.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    // Call Python AI

    const aiRes = await axios.post(`${AI_URL}/ai/recommend`, formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 15000,
    });
    const { predicted_class, confidence, recommended_ids } = aiRes.data;

    // Query DB với id list
    // const products = await Product.findAll({
    //   where: { id: recommended_ids },
    //   include: [
    //     {
    //       model: Category,
    //       attributes: ["name"],
    //     },
    //   ],
    // });
    let products = [];
    if (recommended_ids && recommended_ids.length > 0) {
      products = await Product.findAll({
        where: { id: recommended_ids },
        include: [{ model: Category, attributes: ["name"] }],
      });
    }

    res.json({
      predicted_class,
      confidence,
      recommended: products,
    });
  } catch (err) {
    console.error("❌ Recommend error:", err);
    return res.status(502).json({
      error: "AI service unavailable",
      ai_url: `${AI_URL}/ai/recommend`,
      code: err.code,
      detail: err.message,
    });
  }
};
