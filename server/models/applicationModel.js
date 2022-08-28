var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  batch_id: {
    type: Schema.Types.ObjectId,
    ref: "batch",
  },
  status: String,
  reviewed_by: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  remarks: String,
  timestamps: true,
});

module.exports = mongoose.model("application", applicationSchema);
