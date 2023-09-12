const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    default: "breakfast",
  },
  img: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
  lastUpdateDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model("item", itemSchema);
