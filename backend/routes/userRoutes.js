const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
  getUserData,
  getWeeklyLeaders,
  getAllTimeLeaders,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.put("/", protect, updateUser);
router.get("/leaderboard/week", protect, getWeeklyLeaders);
router.get("/leaderboard/all", protect, getAllTimeLeaders);
router.get("/me", protect, getUserData);

module.exports = router;
