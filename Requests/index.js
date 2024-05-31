const { loginUserRequest } = require("./User/loginRequest");
const { signupUserRequest } = require("./User/signupRequest");
const { uploadCsv, parseCsv } = require("./csvRequest/addCsv");
const { getDataRequest } = require("./csvRequest/getData");

module.exports = {
  loginUserRequest,
  signupUserRequest,
  uploadCsv,
  parseCsv,
  getDataRequest,
};
