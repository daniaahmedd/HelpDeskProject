const mongoose = require('mongoose');
const userSchema = require('./user').Schema;


const agentSchema = new mongoose.Schema( 
    {
        agentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userSchema ,
            required: true
        },
        mainMajor: {
            type: String,
            required: true
        },
    },
    {
    strict: true,
    timestamps: true,
  }
  );


module.exports = mongoose.model('Agent', agentSchema);
module.exports.Schema = agentSchema;   
