const express = require("express");
const router = express.Router();
const uploadFile = require("../services/imagekit.service");
const multer = require("multer");
const fileModel = require("../models/fileModel");

const upload = multer({ storage: multer.memoryStorage() });

// Route for multiple file upload
router.post("/uploadFiles", upload.array("files", 20), async (req, res) => {
  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      const uploaded = await uploadFile(file); // Upload to ImageKit
      const fileType = file.mimetype.split("/")[0]; // image, video, etc.

      const savedFile = await fileModel.create({
        fileName: file.originalname,
        fileUrl: uploaded.url,
        fileType: fileType,
        uploadedAt: new Date(),
      });

      uploadedFiles.push(savedFile);
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
