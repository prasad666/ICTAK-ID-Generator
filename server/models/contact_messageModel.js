var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contact_messageSchema = new Schema({
  name: String,
  email: String,
  message: String,
  createdAt: Date,
});

module.exports = mongoose.model("contact_message", contact_messageSchema);
