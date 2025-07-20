const express = require("express");
const router = express.Router();

const fileModel = require("../models/fileModel");

// Route for multiple file upload
router.delete("/deleteFile/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await fileModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    await fileModel.deleteOne({ _id: fileId });
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading files" });
  }
});

module.exports = router;
