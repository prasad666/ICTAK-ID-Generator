var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  first_name: String,
  last_name: String,
  password: String,
  email: String,
  role: String,
  enabled: Boolean,
  deleted: Boolean,
  timestamps: true,
  deletedAt: Date,
});

module.exports = mongoose.model("user", userSchema);
