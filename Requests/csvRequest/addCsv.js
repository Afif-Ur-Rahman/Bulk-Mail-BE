const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const { saveCsv } = require("../../Schema/CsvFileSchema");

const upload = multer({ dest: "uploads/" });
const uploadCsv = upload.single("file");

const saveData = async (req, res) => {
  const page = 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  if (req.file) {
    const results = [];
    fs.createReadStream(req.file.path)
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
          console.log("updatedData = ", updatedData);
          res.status(200).json({
            success: true,
            data: updatedData,
            page: page,
            totalPages: totalPages,
          });
        } catch (error) {
          res.status(500).json({ success: false, data: error });
        } finally {
          fs.unlinkSync(req.file.path);
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
