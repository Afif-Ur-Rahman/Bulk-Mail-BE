const { mailTemplate } = require("../../Schema/MailTemplateSchema");

const addMailTemplate = async (req, res) => {
  const { subject, message } = req.body;

  try {
    const payload = {
      subject,
      message,
    };

    const newMailTemplate = new mailTemplate(payload);
    const response = await newMailTemplate.save();
    const responseData = {
      subject: response.subject,
      message: response.message,
    };

    console.log("response = ", response);
    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = { addMailTemplate };
