const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  market_cap: {
    type: Number,
    required: true,
  },
  share_price: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  net_income: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stock", stockSchema);
