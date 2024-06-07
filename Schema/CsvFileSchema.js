const mongoose = require("mongoose");

const CsvSchema = new mongoose.Schema({
  "First Name": {type: String, default: ""},
  "Last Name": {type: String, default: ""},
  "Job Title": {type: String, default: ""},
  Company: {type: String, default: ""},
  Email: {type: String, default: ""},
  "Company Phone": {type: String, default: ""},
  Industry: {type: String, default: ""},
  City: {type: String, default: ""},
  Country: {type: String, default: ""},
  Status: {type: String, default: ""},
});

const saveCsv = mongoose.model("csvdata", CsvSchema);
module.exports = { saveCsv };
