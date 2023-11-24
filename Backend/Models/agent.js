const mongoose = require('mongoose');
const userSchema = require('./user').Schema;

const schemaOptions = {
  strict: false,
  timestamps: true,
};

const agentSchema = new mongoose.Schema( 
    {
        agentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },

        rating: {
            type: Int32Array,
            required: true,
        },

        mainmajor: {
            type: String,
            required: true
        },

        submajor: {
            type: String,
            required: true,
        }

    });

    module.exports.Schema = agentSchema; 