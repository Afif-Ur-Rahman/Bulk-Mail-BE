const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

const sendMailRequest = async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    console.log(req.body);
    if (!to || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "afifurrahman444@gmail.com",
        pass: "ijmcakovoivsyevw",
      },
    });
    const sendMailPromises = to.map((email) => {
      const mailOptions = {
        from: "afifurrahman444@gmail.com",
        to: email,
        subject: subject,
        text: message,
      };
      return transporter.sendMail(mailOptions);
    });
    await Promise.all(sendMailPromises);
    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, error: "Error sending emails" });
  }
};

module.exports = { sendMailRequest };
