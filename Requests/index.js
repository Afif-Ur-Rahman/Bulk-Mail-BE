const { loginUserRequest } = require("./User/loginRequest");
const { signupUserRequest } = require("./User/signupRequest");
const { uploadCsv, saveData } = require("./csvRequest/addCsv");
const { getDataRequest } = require("./csvRequest/getData");
const { changePasswordRequest } = require("./User/changePassRequest");
const { updateStatusRequest } = require("./csvRequest/updateStatus");
const { updateDataRequest } = require("./csvRequest/updateData");
const { sendMailRequest } = require("./mailRequest/mailRequest");

module.exports = {
  loginUserRequest,
  signupUserRequest,
  uploadCsv,
  saveData,
  getDataRequest,
  changePasswordRequest,
  updateStatusRequest,
  updateDataRequest,
  sendMailRequest,
};
