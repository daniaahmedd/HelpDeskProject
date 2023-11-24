const mongoose = require("mongoose");

// Schema for individual messages
const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 300 
  },
  sender: {
    type: String,
    enum: ["user", "agent", "manager", "admin"],
    default: "user",
    required: true
  },
}, { timestamps: true });
module.exports = mongoose.model("LiveChatData", MessageSchema);

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
    messaage:[MessageSchema],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveChatData", ChatSchema);
