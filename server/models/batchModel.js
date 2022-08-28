var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var batchSchema = new Schema({
  batch_name: String,
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  batchmanager_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  enabled: Boolean,
  start_date: Date,
  end_date: Date,
  timestamps: true,
});

module.exports = mongoose.model("batch", batchSchema);
