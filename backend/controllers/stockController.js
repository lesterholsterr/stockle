const asyncHandler = require("express-async-handler");
const { promisify } = require("util");
const Stock = require("../models/stockModel");
const fs = require("fs");
const path = require("path");
const readFileAsync = promisify(fs.readFile);

// @desc   Fetch stock data for a particular ticker
// @route  GET /api/stock:id
// @access Public
const getStockData = asyncHandler(async (req, res) => {
  const stockExists = await Stock.findOne({ ticker: req.params.ticker });

  if (stockExists) {
    const stocks = await Stock.find({});
    res
      .status(200)
      .json(stocks.filter((stock) => stock.ticker === req.params.ticker));
  } else {
    res
      .status(400)
      .json({ msg: `No stock with the ticker of ${req.params.ticker}` });
  }
});

const getTodayTicker = asyncHandler(async (req, res) => {
  const FILE_PATH = "../scripts/today.stock";

  try {
    var todayTicker = await readFileAsync(
      path.join(__dirname, FILE_PATH),
      "utf8"
    );
    todayTicker = todayTicker.trim();
    res.status(200).json(todayTicker);
  } catch {
    res.status(500).json({ msg: "Unable to read today's stock ticker" });
  }
});

const getAllStockData = asyncHandler(async (req, res) => {
  const allStocks = await Stock.find({});
  res.status(200).json(allStocks);
});

module.exports = {
  getStockData,
  getTodayTicker,
  getAllStockData,
};
