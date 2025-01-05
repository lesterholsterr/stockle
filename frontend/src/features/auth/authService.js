import axios from "axios";

const API_URL = "/api/users/";

const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Logout user
const logout = async () => {
  localStorage.removeItem("token");
};

// Get user stats (on login)
const getUserData = async () => {
  const response = await axios.get(API_URL + "me", setAuthHeader());
  return response.data;
};

// Update stats
const updateUser = async (userData) => {
  const response = await axios.put(API_URL, userData, setAuthHeader());
  return response.data;
};

// Get Weekly Leaderboard
const getWeeklyLeaders = async () => {
  const response = await axios.get(
    API_URL + "/leaderboard/week",
    setAuthHeader()
  );
  return response.data;
};

// Get All Time Leaderboard
const getAllTimeLeaders = async () => {
  const response = await axios.get(
    API_URL + "/leaderboard/all",
    setAuthHeader()
  );
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUserData,
  updateUser,
  getWeeklyLeaders,
  getAllTimeLeaders,
};

export default authService;
