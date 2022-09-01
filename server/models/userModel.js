var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    first_name: {
      type:String,
      required:true
    },
    last_name: {
      type:String,
      required:true
    },
    password: {
      type:String,
      required:true
    },
    email: {
      type:String,
      required:true,
      unique:true
    },
    role: {
      type:String,
      required:true,
      default:'student',
      enum:['student', 'batchManager', 'admin']
    },
    enabled: Boolean,
    deleted: Boolean,
    deletedAt: Date,
    encryptedResetToken: String,
    passwordResetExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
