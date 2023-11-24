const mongoose = require('mongoose');
const agentSchema = require('./agent').Schema;
const schemaOptions = {
  strict: false,
  timestamps: true,
};

const ticketSchema = new mongoose.Schema( 
    {
        ticketid: {
            type: Int32Array,
            required: true,
        },

        status:{
            type: String,
            enum: ['active','inactive','pending'],
            default: 'pending',
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

        categories: {
            type:String,
           enum:[ "Software", "Hardware", "Network"],
           required:true
        },

        subcategories: {
            type: String,
            required: true,
        },

        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },

        agentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'agent',
            required: true
        },

        priorty: {
            enum: ['high', 'low', 'meidum'],
            required: true
        },

        issue: {
            type: String,
            required: true,
        }

    });

    module.exports.Schema = ticketSchema;
   