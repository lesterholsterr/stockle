const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gamesPlayed: {
      type: Number,
      default: 0,
      required: true,
    },
    gamesWon: {
      type: Number,
      default: 0,
      required: true,
    },
    dailyPoints: {
      type: Number,
      default: 0,
      required: true,
    },
    weeklyPoints: {
      type: Array,
      default: [0, 0, 0, 0, 0, 0, 0],
      required: true,
    },
    totalWeeklyPoints: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
      required: true,
    },
    playedYesterday: {
      type: Boolean,
      default: false,
      required: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
      required: true,
    },
    maxStreak: {
      type: Number,
      default: 0,
      required: true,
    },
    guessDistribution: {
      type: Array,
      default: [0, 0, 0, 0, 0, 0, 0],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
