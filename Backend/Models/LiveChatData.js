<<<<<<< Updated upstream
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
=======
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      default: Date.now,
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
=======
      default: Date.now
    },
    // agentID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'agent',
    //   required: true
    // },
    // userID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // }
>>>>>>> Stashed changes
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveChatData", ChatSchema);
