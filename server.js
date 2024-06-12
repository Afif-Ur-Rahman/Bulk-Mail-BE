const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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
} = require("./Requests");
const app = express();

// Connection to MongoDb
const port = 5000;
const db_url = "mongodb://127.0.0.1:27017/BulkMail";
mongoose
  .connect(db_url)
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
app.use(express.json());

app.post("/signup", signupUserRequest);
app.post("/login", loginUserRequest);
app.get("/getdata", getDataRequest);
app.post("/savedata", uploadCsv, saveData);
app.post("/changepass", changePasswordRequest);
app.put("/:id/status", updateStatusRequest);
app.put("/:id/updatedata", updateDataRequest);
app.post("/sendmails", sendMailRequest);
