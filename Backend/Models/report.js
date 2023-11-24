const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    status: {
        type: String,
        required: true,
    },

    opendedtime: {
        type: Date,
        default: Date.now,
        required: true,
    },

    closetime: {
        type: Date,
        default: Date.now,
        required: true,
    },

    rating: {
        type: Int32Array,
        required: true
    }


  });module.exports.Schema = reportSchema;