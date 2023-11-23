const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30
    },
    message: {
      //min w el max dol zeyada
      type: String,
      minLength: 1,
      maxLength: 300
    },
    date: {
      type: Date,
      default: Date.now
    },
    agentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'agent',
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);
//agent mlosh lazma!! aashan howa user 3ady.  either enum aw role {user,agent,manager,admin}
module.exports = mongoose.model('LiveChatData', ChatSchema);
