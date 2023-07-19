const express = require("express");
const router = express.Router();
const {
  getStockData,
  getAllStockData,
} = require("../controllers/stockController");

router.get("/all", getAllStockData);
router.get("/:ticker", getStockData);

module.exports = router;
