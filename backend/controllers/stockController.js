const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

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

const getAllStockData = asyncHandler(async (req, res) => {
  const allStocks = await Stock.find({});
  res.status(200).json(allStocks);
});

module.exports = {
  getStockData,
  getAllStockData,
};
