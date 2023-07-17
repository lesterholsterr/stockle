const express = require("express");
const router = express.Router();
const { getAllHistory, postHistory } = require("../controllers/historyController");

router.get("/", getAllHistory);
router.post("/", postHistory);

module.exports = router;
