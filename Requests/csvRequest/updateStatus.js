const {saveCsv} = require("../../Schema/CsvFileSchema");

const updateStatusRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const { Status } = req.body;
  
      const updatedItem = await saveCsv.findByIdAndUpdate(
        id,
        { Status: Status },
        { new: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
  
      return res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error updating status', error });
    }
  };

  module.exports = {updateStatusRequest};