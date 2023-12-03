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

    opendtime: {
        type: Date,
        required: true,
    },

    closedtime: {
        type: Date,
        required: true,
    },

    rating: {
        type: Number,
        required: true
    },
    agentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agentSchema",
      required: false
  },


  }, {
    strict: true,
 
  });
  module.exports= mongoose.model("Report", reportSchema)