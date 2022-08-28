var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  course_name: String,
  enabled: Boolean,
  timestamps: true,
});

module.exports = mongoose.model("course", courseSchema);
