const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: String
  },
  date: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Record", recordSchema);
