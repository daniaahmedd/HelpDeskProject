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
    default: 'user',
    required: true
  },
}, { timestamps: true });
module.exports = mongoose.model("Message", MessageSchema);
module.exports.Schema = MessageSchema;   