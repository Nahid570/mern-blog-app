const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../model/emailMessaging/emailMessaging");
var Filter = require("bad-words");

// Send Email message
const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req?.body;
  const emailMessage = subject + " " + message;
  // check for profane words
  const filter = new Filter();
  const isProfane = filter.isProfane(emailMessage);
  if (isProfane)
    throw new Error("Email can't be send, because it's contains profane words");
  try {
    const msg = {
      to,
      subject,
      text: message,
      from: "farajinahid2@gmail.com",
    };
    await sgMail.send(msg);
    // save a copy of this email to our database
    await EmailMsg.create({
      sentBy: req?.user?.id,
      fromEmail: req?.user?.email,
      toEmail: to,
      subject,
      message,
    });
    res.json("Email Sent");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsgCtrl };
