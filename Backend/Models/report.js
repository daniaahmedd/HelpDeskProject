const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {

    status: {
        type: String,
        required: true,
    },

    opendedtime: {
        type: Date,
        required: true,
    },

    closetime: {
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