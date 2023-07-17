const asyncHandler = require("express-async-handler");
const HistoricalPrice = require("../models/historyModel");

// @desc   Fetch all historical prices
// @route  GET /api/history
// @access Public
const getAllHistory = asyncHandler(async (req, res) => {});

// @desc   Create a new historical price
// @route  POST /api/history
// @access Public
const postHistory = asyncHandler(async (req, res) => {});

module.exports = {
  getAllHistory,
  postHistory,
};
