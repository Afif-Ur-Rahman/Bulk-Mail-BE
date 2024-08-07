const { mailTemplate } = require("../../Schema/MailTemplateSchema");

const getTemplatesRequest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const data = await mailTemplate
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await mailTemplate.countDocuments({});
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

module.exports = { getTemplatesRequest };
