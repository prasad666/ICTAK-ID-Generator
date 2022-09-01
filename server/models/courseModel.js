var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("course", courseSchema);
