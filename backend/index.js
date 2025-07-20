//import
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");
const uploadFileRoute = require("./routes/uploadFileRoute");
const getFilesRoute = require("./routes/getFilesRoute");
const deleteFileRoute = require("./routes/deleteFileRoute");
const PORT = process.env.PORT || 3000;

// config
connectDB();
app.use(cors());
app.use(express.json());

// routes
app.use("/upload", uploadFileRoute);
app.use("/get", getFilesRoute);
app.use("/delete", deleteFileRoute);
//port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
