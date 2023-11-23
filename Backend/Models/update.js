const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndex: true
});

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30
    },
    message: {
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
      ref: 'Agent',
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

module.exports = mongoose.model('LiveChatData', ChatSchema);