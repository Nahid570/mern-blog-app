const express = require("express");
const {
  sendEmailMsgCtrl,
} = require("../../controllers/sendEmail/emailMsgCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const sendMailRouter = express.Router();

sendMailRouter.post("/", authMiddleware, sendEmailMsgCtrl);

module.exports = sendMailRouter;
