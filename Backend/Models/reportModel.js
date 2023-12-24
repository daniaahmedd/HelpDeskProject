const mongoose = require('mongoose');
const agentSchema = require('./agentModel').Schema;
const ticketSchema = require('./ticketModel').Schema;



const reportSchema = new mongoose.Schema(
  {

    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      requied: true,
    },
    status: {
        type: String,
        required: true,
    },

    openedtime: {
        type: Date,
        required: true,
    },

    closedtime: {
        type: Date,
        required: false,
    },
    resolutiontime: {
      type : Date,
      required: false
    },

    rating: {
        type: Number,
        required: false
    },
    Agentrating:{
      type: Number,
      require: false
    },
    agentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agentSchema",
      required: false
  },    
  ticketid: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "ticketSchema",
    required: true
  }


  }, {
    strict: true,
 
  });
  module.exports= mongoose.model("Report", reportSchema)