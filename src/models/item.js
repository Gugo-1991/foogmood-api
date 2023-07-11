const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    default: "breakfast",
  },
  image: {
    type: URL,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("itemSchema", itemSchema);
