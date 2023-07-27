const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  // Validate input
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check for duplicates
  const userEmailExists = await User.findOne({ email });
  if (userEmailExists) {
    res.status(400);
    throw new Error("Email already in use");
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username taken");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10); // <-- no idea what this does lol
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      dailyPoints: user.dailyPoints,
      weeklyPoints: user.weeklyPoints,
      totalPoints: user.totalPoints,
      playedYesterday: user.playedYesterday,
      currentStreak: user.currentStreak,
      maxStreak: user.maxStreak,
      guessDistribution: user.guessDistribution,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Authenticate new user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check for username
  const user = await User.findOne({ username });

  // Compare inputted password with the hashed password stored in DB
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      dailyPoints: user.dailyPoints,
      weeklyPoints: user.weeklyPoints,
      totalPoints: user.totalPoints,
      playedYesterday: user.playedYesterday,
      currentStreak: user.currentStreak,
      maxStreak: user.maxStreak,
      guessDistribution: user.guessDistribution,
    });
  } else {
    res.status(400);
    throw new Error("Username or password incorrect");
  }
});

// Generate JWT
// Seems like I won't end up needing this...
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc   Updates user statistics after a win/loss
// @route  PUT /api/users/
// @access Public
const updateUser = asyncHandler(async (req, res) => {
  const {
    _id: id,
    gamesPlayed: updGP,
    gamesWon: updGW,
    dailyPoints: updDP,
    weeklyPoints: updWP,
    totalPoints: updTP,
    playedYesterday: updPY,
    currentStreak: updCS,
    maxStreak: updMS,
    guessDistribution: updGD,
  } = req.body;

  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error(`No user with the id ${id} found`);
  }

  const updatedUser = {
    _id: id,
    username: user.username,
    email: user.email,
    gamesPlayed: updGP,
    gamesWon: updGW,
    dailyPoints: updDP,
    weeklyPoints: updWP,
    totalPoints: updTP,
    playedYesterday: updPY,
    currentStreak: updCS,
    maxStreak: updMS,
    guessDistribution: updGD,
  };

  const response = await User.findByIdAndUpdate(user.id, updatedUser, {
    new: true,
  });
  res.status(200).json(response);
});

// @desc   Returns all users sorted in descending order by weekly points
// @route  GET /api/users/leaderboard/week
// @access Public
const getWeeklyLeaders = asyncHandler(async (req, res) => {
  try {
    const leaders = await User.find({}).sort({ weeklyPoints: -1 }).limit(10);
    res.status(200).json(leaders);
  } catch (error) {
    throw new Error(error);
  }
});

// @desc   Returns all users sorted in descending order by total points
// @route  GET /api/users/leaderboard/all
// @access Public
const getAllTimeLeaders = asyncHandler(async (req, res) => {
  try {
    const leaders = await User.find({}).sort({ totalPoints: -1 }).limit(10);
    res.status(200).json(leaders);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getWeeklyLeaders,
  getAllTimeLeaders,
};
