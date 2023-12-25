const mongoose = require("mongoose");
const agent = require('./agentModel');
const user = require('./userModel');
const ticket = require('./ticketModel');

const ChatSchema = new mongoose.Schema(
  {
    ticketid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticket",
      required: false
    },

    
    messages: [{
      content:{ 
        type: String,
        required: true,  
      },
      senderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      sendTime:{
        type: Date,
        default: Date.now,
        required: true
      }
  }], 

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
  },

  agentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
      required: true
  },
  status:{
    type: String,
    enum: ['Open','Close'],
    default: 'Open',
    required: true,
  }
},
  { strict:false, timestamps: true }
);

module.exports = mongoose.model("LiveChat", ChatSchema);

