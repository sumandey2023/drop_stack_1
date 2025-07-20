const express = require("express");
const router = express.Router();

const fileModel = require("../models/fileModel");

// Route for multiple file upload
router.get("/getFiles", async (req, res) => {
  try {
    const files = await fileModel.find();
    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading files" });
  }
});

module.exports = router;
