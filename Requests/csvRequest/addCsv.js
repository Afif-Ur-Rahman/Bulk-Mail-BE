const multer = require("multer");
const csv = require("csv-parser");
const { saveCsv } = require("../../Schema/CsvFileSchema");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadCsv = upload.single("file");

const saveData = async (req, res) => {
  const page = 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  if (req.file) {
    const results = [];
    const bufferStream = require('stream').Readable.from(req.file.buffer);

    bufferStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          await saveCsv.insertMany(results);
          const updatedData = await saveCsv
            .find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
          const totalItems = await saveCsv.countDocuments({});
          const totalPages = Math.ceil(totalItems / limit);
          res.status(200).json({
            success: true,
            data: updatedData,
            page: page,
            totalPages: totalPages,
          });
        } catch (error) {
          res.status(500).json({ success: false, data: error });
        }
      });
  } else {
    try {
      const payload = req.body;
      const newData = new saveCsv(payload);
      await newData.save();
      const updatedData = await saveCsv
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
      const totalItems = await saveCsv.countDocuments({});
      const totalPages = Math.ceil(totalItems / limit);
      res.status(200).json({
        success: true,
        data: updatedData,
        page: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(500).json({ success: false, data: error });
    }
  }
};

module.exports = { uploadCsv, saveData };
