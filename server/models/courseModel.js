var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    course_name: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", courseSchema);
