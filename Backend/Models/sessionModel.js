const mongoose = require("mongoose");
const userSchema = require('./user').Schema;

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userSchema,
      requied: true,
    },
    token: {
      type: String,
      requied: true,
    },
    expiresAt: {
      type: Date,
      requied: true,
    },
  },
 {
    strict :true,
    timestamps: true
 }
);

module.exports = mongoose.model("sessionSchema", sessionSchema);
