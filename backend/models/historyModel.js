const mongoose = require("mongoose");

const historicalPriceSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  open: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  low: {
    type: Number,
    required: true,
  },
  close: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("HistoricalPrice", historicalPriceSchema);
