const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Token format: { "id": str, "iat": int, "exp": int}
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  console.log("Creating user...");
  // Validate input
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    // <-- should be caught by the front-end
    res.status(400).json({ message: "Please add all fields" });
    return;
  }

  // Check for duplicates
  const userEmailExists = await User.findOne({ email });
  if (userEmailExists) {
    res.status(400).json({ message: "Email already in use" });
    console.log("Email already in use");
    return;
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400).json({ message: "Username taken" });
    console.log("Username taken");
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
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
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
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
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Password incorrect");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc   Get user data (on login)
// @route  GET /api/users/me
// @access Private
const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({
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
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Updates user statistics after a win/loss
// @route  PUT /api/users/
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const {
    _id: id,
    gamesPlayed: updGP,
    gamesWon: updGW,
    dailyPoints: pointsEarned1,
    weeklyPoints: pointsEarned2,
    totalPoints: pointsEarned3,
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
    dailyPoints: user.dailyPoints + pointsEarned1,
    weeklyPoints: user.weeklyPoints + pointsEarned2,
    totalPoints: user.totalPoints + pointsEarned3,
    playedYesterday: updPY,
    currentStreak: user.currentStreak + updCS,
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
// @access Private
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
// @access Private
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
  getUserData,
  getWeeklyLeaders,
  getAllTimeLeaders,
};
