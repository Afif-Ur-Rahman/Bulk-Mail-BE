const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const {saveCsv} = require("../../Schema/CsvFileSchema")

const upload = multer({ dest: 'uploads/' });

const uploadCsv = upload.single('file');

const parseCsv = (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        console.log("results = ", results);
        await saveCsv.insertMany(results);
        res.status(200).json({success: true, data: results});
      } catch (error) {
        res.status(500).json({success: false, data: error});
      } finally {
        fs.unlinkSync(req.file.path);
      }
    });
};

module.exports = { uploadCsv, parseCsv };
