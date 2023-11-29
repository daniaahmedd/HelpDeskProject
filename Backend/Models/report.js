const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {

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
        type: Int32Array,
        required: true
    }


  }, {
    strict: true,
 
  });
  module.exports= mongoose.model("Report", reportSchema)