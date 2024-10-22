const asyncHandler = require("express-async-handler");
const { promisify } = require("util");
const Stock = require("../models/stockModel");
const fs = require("fs");
const path = require("path");
const readFileAsync = promisify(fs.readFile);

// @desc   Fetch stock data for a particular ticker
// @route  GET /api/stock/:id
// @access Public
const getStockData = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({ _id: req.params.ticker });

  if (stock) {
    res.status(200).json(stock);
  } else {
    res.status(400).json({ msg: `No stock with the ticker of ${req.params.ticker}` });
  }
});

// @desc   Fetch stock data for today's stock
// @route  GET /api/stock/today
// @access Public
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

// @desc   Fetch list of names and tickers for all stocks in stockpile
// @route  GET /api/stock/list
// @access Public
const getTickerList = asyncHandler(async (req, res) => {
  try {
    const allStocks = await Stock.find({}).select(
      "price.shortName price.symbol -_id"
    );
    const tickerList = allStocks.map((stock) => ({
      name: stock.price.shortName,
      ticker: stock.price.symbol,
    }));
    res.status(200).json(tickerList);
  } catch (error) {
    res.status(500).json({ msg: "Unable to fetch ticker list" });
  }
});

module.exports = {
  getStockData,
  getTodayTicker,
  getTickerList,
};
