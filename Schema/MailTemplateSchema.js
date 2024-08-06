const mongoose = require("mongoose");
const MailTemplateSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  subject: {type: String, required: true},
  message: {type: String, required: true},
});

const mailTemplate = mongoose.model("Mail_Template", MailTemplateSchema);

module.exports = { mailTemplate };
