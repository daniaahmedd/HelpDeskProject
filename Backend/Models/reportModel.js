const mongoose = require('mongoose');
const agentSchema = require('./agentModel').Schema;


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
    agentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agentSchema",
      required: false
  },


  }, {
    strict: true,
    timestamps : false
 
  });
  module.exports= mongoose.model("Report", reportSchema)