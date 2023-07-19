const asyncHandler = require("express-async-handler");
const HistoricalPrice = require("../models/historyModel");

// @desc   Fetch all historical prices
// @route  GET /api/history
// @access Public
const getAllHistory = asyncHandler(async (req, res) => {
  const allHistory = await HistoricalPrice.find({});
  res.status(200).json(allHistory);
});

module.exports = {
  getAllHistory,
};
