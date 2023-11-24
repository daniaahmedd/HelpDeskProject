const mongoose = require("mongoose");
const MessageSchema = require('./Message').Schema;
const schemaOptions = {
  strict: false,
  timestamps: true,
};


const ChatSchema = new mongoose.Schema(
  {
    messages: [MessageSchema], // Array of messages following MessageSchema
    role: {
      type: String,
      enum: ["user", "agent", "manager", "admin"],
      default: "pending",
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveChatData", ChatSchema);
