const mongoose = require('mongoose');
const agentSchema = require('./agent').Schema;
const userSchema = require('./user').Schema;

const ticketSchema = new mongoose.Schema( 
    {
        status:{
            type: String,
            enum: ['Pending','Opened','Closed','Canceled'],
            default: 'Opened',
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
            required: true,
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
            ref: userSchema,
            required: true
        },

        agentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: agentSchema,
            required: true
        },

        priorty: {
            enum: ['high', 'low', 'meidum'],
            required: true
        },

        issueDescription: {
            type: String,
            required: true,
        },
        rating: {
            type: Int32Array,
            required: false,
        },
    },
    {
        strict: true,
        timestamps: true,
      }
      );

module.exports = mongoose.model('Ticket', ticketSchema);
module.exports.Schema = ticketSchema;   

   