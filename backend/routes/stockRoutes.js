const express = require("express");
const router = express.Router();
const {
  getStockData,
  postStockData,
} = require("../controllers/stockController");

router.get("/:ticker", getStockData);
router.post("/", postStockData);

module.exports = router;
