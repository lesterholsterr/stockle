const express = require("express");
const router = express.Router();
const {
  getStockData,
  getTodayTicker,
  getTickerList,
} = require("../controllers/stockController");

router.get("/list", getTickerList);
router.get("/today", getTodayTicker);
router.get("/:ticker", getStockData);

module.exports = router;
