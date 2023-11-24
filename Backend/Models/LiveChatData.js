const mongoose = require("mongoose");
const MessageSchema = require('./Message').Schema;
const agentSchema = require('./agent').Schema;
const userSchema = require('./user').Schema;


const ChatSchema = new mongoose.Schema(
  {
    messages: [{ type: String }], // Array of messages following MessageSchema
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userSchema,
      required: true
  },

  agentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: agentSchema,
      required: true
  },
  },
  { strict:false, timestamps: true }
);

module.exports = mongoose.model("LiveChatData", ChatSchema);
