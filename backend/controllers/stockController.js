const asyncHandler = require("express-async-handler");
const Stock = require("../models/stockModel");

// @desc   Fetch stock data for a particular ticker
// @route  GET /api/stock:id
// @access Public
const getStockData = asyncHandler(async (req, res) => {
  const stockExists = await Stock.some({ ticker: req.params.ticker });

  if (stockExists) {
    res
      .status(200)
      .json(Stock.filter((stock) => stock.ticker === req.params.ticker));
  } else {
    res
      .status(400)
      .json({ msg: `No stock with the ticker of ${req.params.ticker}` });
  }
});

// @desc   Create a new stock (at daily reset)
// @route  POST /api/stock
// @access Public
const postStockData = asyncHandler(async (req, res) => {
  const {
    ticker,
    name,
    sector,
    market_cap,
    share_price,
    revenue,
    net_income,
    summary,
  } = req.body;

  if (
    !ticker ||
    !name ||
    !sector ||
    !market_cap ||
    !share_price ||
    !revenue ||
    !net_income ||
    !summary
  ) {
    res.status(400);
    throw new Error("Missing fields");
  } else {
    const newStock = await Stock.create({
      ticker,
      name,
      sector,
      market_cap,
      share_price,
      revenue,
      net_income,
      summary,
    });
    res.status(201);
  }
});

module.exports = {
  getStockData,
  postStockData,
};
