const { saveCsv } = require("../../Schema/CsvFileSchema");

const getDataRequest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const data = await saveCsv
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await saveCsv.countDocuments({});
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      success: true,
      data: data,
      page: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

module.exports = { getDataRequest };
