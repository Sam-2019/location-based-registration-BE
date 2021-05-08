const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  token: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  department: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  registered: [
    {
      type: Schema.Types.ObjectId,
      ref: "Register",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
