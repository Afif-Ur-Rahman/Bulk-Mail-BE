const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {
  signupUserRequest,
  loginUserRequest,
  uploadCsv,
  saveData,
  getDataRequest,
  changePasswordRequest,
  updateStatusRequest,
  updateDataRequest,
  sendMailRequest,
  addMailTemplate,
} = require("./Requests");
const { verifyToken } = require("./middleware/authToken");
const app = express();

// Connection to MongoDb
const port = process.env.PORT;
const db = process.env.MONGO_DB_URI;
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected To Database");
    app.listen(port, () => {
      if (mongoose.connection.readyState === 1) {
        console.log(`Server is running on port ${port}`);
      }
    });
  })
  .catch((error) => {
    console.log(`Server Failed to run on port ${port}`);
    console.error("Database Connection error:", error);
  });

// Setting CORS
const corsOption = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  headers: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.options("*", cors(corsOption));
app.use(express.json());

app.post("/signup", signupUserRequest);
app.post("/login", loginUserRequest);
app.get("/getdata", verifyToken, getDataRequest);
app.post("/savedata", verifyToken, uploadCsv, saveData);
app.post("/changepass", verifyToken, changePasswordRequest);
app.put("/:id/status", verifyToken, updateStatusRequest);
app.put("/:id/updatedata", verifyToken, updateDataRequest);
app.post("/sendmails", verifyToken, sendMailRequest);
app.post("/addmailtemplate", verifyToken, addMailTemplate);

module.exports = app;
