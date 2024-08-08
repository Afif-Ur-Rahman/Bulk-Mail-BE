const { mailTemplate } = require("../../Schema/MailTemplateSchema");

const updateTemplatesRequest = async (req, res) => {
  const { _id, subject, message } = req.body;
  try {
    const data = await mailTemplate.findByIdAndUpdate(
      _id, 
      { subject, message },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

module.exports = { updateTemplatesRequest };
