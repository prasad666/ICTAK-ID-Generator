var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "student",
      enum: ["student", "batchManager", "admin"],
    },
    photo: String,
    activated: { type: Boolean, default: false },
    enabled: Boolean,
    deleted: Boolean,
    deletedAt: Date,
    encryptedResetToken: String,
    passwordResetExpiry: Date,
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("user", userSchema);
