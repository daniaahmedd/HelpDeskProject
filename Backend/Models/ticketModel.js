const mongoose = require('mongoose');
const agentSchema = require('./agentModel').Schema;
const userSchema = require('./userModel').Schema;


const ticketSchema = new mongoose.Schema( 
    {
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            requied: true,
          },
        status:{
            type: String,
            enum: ['Pending','Open','Closed'],
            default: 'Open',
            required: true,
        },

        opendedtime: {
            type: Date,
            default: Date.now,
            required: true,
        },

        closetime: {
            type: Date,
            default: null,
            required: false,
        },

        categories: {
            type:String,
           enum:[ "Software", "Hardware", "Network"],
           required:true
        },

        subcategories: {
            type: String,
            enum:["Desktops", "Laptops", "Printers", "Servers", "Networking equipment", 
            " Operating system"," Application software"," Custom software"," Integration issues",
            "Email issues", "Internet connection problems", "Website errors"],
            required: true,
        },

        userid: {   
            type: mongoose.Schema.Types.ObjectId,
            ref: "userSchema",
            required: true
        },

        agentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "agentSchema",
            required: false
        },

        priorty: {
            type:String,
            enum: ['high', 'low', 'medium'],
            required: false
        },

        issueDescription: {
            type: String,
            required: true,
        },
        issueSolution:{
            type: String,
            required: false,
        },
        rating:{
            type: Number,
            required: false
        }

    },{
        strict: true,
        timestamps: false,
      });

      module.exports = mongoose.model('Ticket', ticketSchema);
      module.exports.Schema = ticketSchema;   

   