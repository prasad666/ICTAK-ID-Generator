var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var Schema = mongoose.Schema;

var batchSchema = new Schema(
  {
    batch_name: { type: String, required: true },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    enabled: Boolean,
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  { timestamps: true }
);
batchSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("batch", batchSchema);
