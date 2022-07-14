const mongoose = require("mongoose");

const emailMsgSchema = new mongoose.Schema(
  {
    fromEmail: {
      type: String,
      required: [true, "Email is required"],
    },
    toEmail: {
      type: String,
      required: [true, "Email is required"],
    },
    message: {
      type: String,
      required: [true, "Message body is required"],
    },
    subject: {
      type: String,
      required: [true, "Message subject is required"],
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compile into a model
const EmailMsg = mongoose.model("EmailMsg", emailMsgSchema);

module.exports = EmailMsg;
