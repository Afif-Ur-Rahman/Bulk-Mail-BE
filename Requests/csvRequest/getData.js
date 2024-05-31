const { saveCsv } = require("../../Schema/CsvFileSchema");

const getDataRequest = async (req, res) => {
  try {
    const data = await saveCsv.find({});

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

module.exports = { getDataRequest };