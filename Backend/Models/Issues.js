const mongoose = require('mongoose');

const IssuesSchema = new mongoose.Schema(
  {
    type: {
        type: String,
        enum: ['Software','Hardware','Network'],
        default: 'No Issue',
        minLength: 2,
        maxLength: 30,
        required : true
    },
    category: {
        type: String,
        minLength: 1,
        maxLength: 30,
        required : true
    },
    subCategory: {
        type: String,
        minLength: 1,
        maxLength: 30,
        required : true
    },
    prioritySub: {
        type: String,
        enum: ['Low','Medium','High'],
        default: 'No Issue',
        minLength: 1,
        maxLength: 30,
        required : true
    },
    },
    { timestamps: true },
);
module.exports = mongoose.model('IssuesSchema', IssuesSchema);
