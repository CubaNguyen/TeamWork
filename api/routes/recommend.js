const express = require("express");
const multer = require("multer");
const { recommend } = require("../controllers/recommendController");

const upload = multer(); // memory storage

const router = express.Router();

// recommend products based on image
router.post("/", upload.single("file"), recommend);

module.exports = router;
