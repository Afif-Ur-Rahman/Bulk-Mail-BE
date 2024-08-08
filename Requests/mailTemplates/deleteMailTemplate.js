const { mailTemplate } = require("../../Schema/MailTemplateSchema");

const deleteTemplatesRequest = async (req, res) => {
  const { _id } = req.body;
  try {
    const data = await mailTemplate.findByIdAndDelete(_id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

module.exports = { deleteTemplatesRequest };
