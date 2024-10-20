const mongoose = require("mongoose");

const dailyReturnsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  adjclose: {
    type: Number,
    required: true,
  },
  close: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    required: true,
  },
  low: {
    type: Number,
    required: true,
  },
  open: {
    type: Number,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("DailyReturn", dailyReturnsSchema, "dailyreturns");
