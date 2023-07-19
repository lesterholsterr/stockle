const express = require("express");
const router = express.Router();
const {
  getAllHistory,
} = require("../controllers/historyController");

router.get("/", getAllHistory);

module.exports = router;
