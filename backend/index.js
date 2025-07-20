//import
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const uploadFileRoute = require("./routes/uploadFileRoute");
const getFilesRoute = require("./routes/getFilesRoute");
PORT = process.env.PORT;

// config
connectDB();
dotenv.config();
app.use(cors());
app.use(express.json());

// routes
app.use("/upload", uploadFileRoute);
app.use("/get", getFilesRoute);
//port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
