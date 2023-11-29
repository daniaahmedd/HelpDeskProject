const mongoose = require('mongoose');
const userSchema = require('./user').Schema;


const agentSchema = new mongoose.Schema( 
    {
        agentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userSchema ,
            required: true
        },
        categories: {
            type:String,
           enum:[ "Software", "Hardware", "Network"],
           required:true
        },
    },
    {
    strict: true,
    timestamps: true,
  }
  );


module.exports = mongoose.model('Agent', agentSchema);
module.exports.Schema = agentSchema;   
