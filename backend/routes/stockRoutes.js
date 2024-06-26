const express = require("express");
const router = express.Router();
const {
  getStockData,
  getTodayTicker,
  getAllStockData,
} = require("../controllers/stockController");

router.get("/all", getAllStockData);
router.get("/today", getTodayTicker);
router.get("/:ticker", getStockData);

module.exports = router;
