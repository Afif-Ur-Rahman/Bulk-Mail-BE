const { saveCsv } = require("../../Schema/CsvFileSchema");

const updateDataRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { addDataForm } = req.body;
    const updatedItem = await saveCsv.findByIdAndUpdate(
      id,
      {
        $set: {
          "First Name": addDataForm["First Name"],
          "Last Name": addDataForm["Last Name"],
          "Job Title": addDataForm["Job Title"],
          Company: addDataForm.Company,
          Email: addDataForm.Email,
          "Company Phone": addDataForm["Company Phone"],
          Industry: addDataForm.Industry,
          City: addDataForm.City,
          Country: addDataForm.Country,
          Status: addDataForm.Status,
        },
      },
      { new: true }
    );
    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    return res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating status", error });
  }
};

module.exports = { updateDataRequest };
