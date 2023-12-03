const mongoose = require('mongoose');
const userSchema = require('./userModel').Schema;


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
        workload: { //represent the admin capacity to handle the tickets
            //decrement when the admin set a ticket status to close "MARINA's Part"
            type: Number,
            default: 5
        },
    },
    {
    strict: true,
    timestamps: true,
  }
  );


module.exports = mongoose.model('Agent', agentSchema);
module.exports.Schema = agentSchema;   
