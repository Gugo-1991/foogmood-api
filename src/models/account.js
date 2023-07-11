const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("account", accountSchema);
