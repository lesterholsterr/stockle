import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

// Update stats
const updateUser = async (userData) => {
  const response = await axios.put(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Get Weekly Leaderboard
const getWeeklyLeaders = async () => {
  const response = await axios.get(API_URL + "/leaderboard/week");
  return response.data;
};

// Get All Time Leaderboard
const getAllTimeLeaders = async () => {
  const response = await axios.get(API_URL + "/leaderboard/all");
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  updateUser,
  getWeeklyLeaders,
  getAllTimeLeaders,
};

export default authService;
