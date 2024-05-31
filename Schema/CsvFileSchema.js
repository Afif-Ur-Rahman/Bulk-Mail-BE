const mongoose = require("mongoose");

const CsvSchema = new mongoose.Schema({
  Year: String,
  Value: String,
});

const saveCsv = mongoose.model("csvdata", CsvSchema);
module.exports = { saveCsv };
