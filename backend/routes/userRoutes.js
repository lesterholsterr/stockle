const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
  getWeeklyLeaders,
  getAllTimeLeaders,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.put("/", updateUser);
router.get("/leaderboard/week", getWeeklyLeaders);
router.get("/leaderboard/all", getAllTimeLeaders);

module.exports = router;
