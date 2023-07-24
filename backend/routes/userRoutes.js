const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.put("/", updateUser)

module.exports = router;
