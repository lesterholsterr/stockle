const express = require("express");
const path = require("path");
const connectDB = require("./db");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const reset = require("./reset");
const diagnostic = require("./diagnostic/diagnostic");

const startDBAndServer = async () => {
  connectDB();
  const app = express();

  // Be able to read body messages
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Routers
  app.use("/api/users", require("./routes/userRoutes"));
  app.use("/api/stock", require("./routes/stockRoutes"));
  app.use("/api/history", require("./routes/historyRoutes"));

  // Serve the React app's static files
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });

  // Error Handler
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server started on port ${port}`));
};

const isMonday = () => {
  const currentDate = new Date();
  return currentDate.getDay() === 1; // Monday is represented by 1 in the getDay() method
};

const scheduleReset = () => {
  const currentDate = new Date();

  const timeUntilMidnight =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      0, // hour
      0, // minute
      0, // second
      0 // millisecond
    ).getTime() - currentDate.getTime();
  console.log("Time until daily reset: ", timeUntilMidnight);

  setTimeout(() => {
    reset.startDailyReset();
    if (isMonday()) {
      reset.startWeeklyReset();
    }
    scheduleReset(); // Recursion!
  }, timeUntilMidnight);
};

startDBAndServer();
scheduleReset();
diagnostic.testVenvImport();
