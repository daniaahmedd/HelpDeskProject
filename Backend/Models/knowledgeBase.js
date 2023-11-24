const mongoose = require('mongoose');

//schema for user story no 3
const knowledgeBaseschema = new mongoose.Schema(
  {
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    question:{
        type:String,
        required:true,
    },
    solution:{
        type:String,
        required:true,
    },
    question_category:{
      type: String,
      enum: ['Software','Hardware','Network'],
      required: true,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);


module.exports = mongoose.model('knowledgeBase', knowledgeBaseschema);
