const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

const Stock = require("./models/stockModel");
const User = require("./models/userModel");

const REFRESH_UNIVERSE_SCRIPT = path.join(
  __dirname,
  "/scripts/refresh_universe.py"
);
const UNIVERSE_DATA_SCRIPT = path.join(
  __dirname,
  "/scripts/fetch_daily_universe_data.py"
);
const HISTORICAL_DATA_SCRIPT = path.join(
  __dirname,
  "/scripts/fetch_today_stock_return.py"
);

const startDailyReset = async () => {
  console.log("Starting daily reset...");
  try {
    console.log("1 - Refresh stock universe");
    await runPythonScript(REFRESH_UNIVERSE_SCRIPT);
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("2 - fetching characteristics data for securities in universe");
    await runPythonScript(UNIVERSE_DATA_SCRIPT);
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("3 - select a random stock from valid.stock");
    await chooseNewStock();
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("4 - fetch historical data for today's stock");
    await runPythonScript(HISTORICAL_DATA_SCRIPT);
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("5 - reset user streaks");
    await resetUserDaily();
  } catch (error) {
    console.error(error);
  }

  console.log("Daily reset complete.");
};

const startWeeklyReset = async () => {
  // Since daily reset also runs at the end of the week, we only have to reset weekly user streaks
  console.log("Starting weekly reset...");
  try {
    await resetUserWeekly();
    console.log("Weekly reset complete.");
  } catch (error) {
    console.error(error);
  }
};

const runPythonScript = async (executablePath) => {
  console.log("Running ", executablePath, "...");
  return new Promise((resolve, reject) => {
    const childPython = spawn("python", [executablePath]);

    childPython.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    childPython.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });
    childPython.on("close", (code) => {
      if (code === 0) {
        console.log(`${executablePath} exited with code ${code}`);
        resolve();
      } else {
        reject(new Error(`${executablePath} exited with code ${code}`));
      }
    });
    childPython.on("error", (err) => {
      console.error(`Error executing ${executablePath}:`, err);
      reject(err);
    });
  });
};

const readCSV = async (filepath) => {
  try {
    const data = await fs.readFile(path.join(__dirname, filepath), "utf8");
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const chooseNewStock = async () => {
  try {
    const tickerData = await readCSV("valid.stock");
    const tickers = tickerData
      .split("\n")
      .filter((ticker) => ticker.trim() !== "");

    let foundStock = false;
    let todayStock;

    while (!foundStock && tickers.length > 0) {
      const randomIndex = Math.floor(Math.random() * tickers.length);
      todayStock = tickers[randomIndex];
      tickers.splice(randomIndex, 1); // Remove the selected stock from the list to avoid duplicates

      // Check if the stock exists in the database
      try {
        const stockExists = await Stock.exists({ _id: todayStock });
        if (stockExists) {
          foundStock = true;
        }
      } catch (error) {
        console.error(
          `${todayStock} is not in the database, choosing a new stock...`,
          error
        );
      }
    }

    if (foundStock) {
      try {
        await fs.writeFile("./backend/scripts/today.stock", todayStock);
        console.log(`Today's stock is $${todayStock}`);
      } catch (err) {
        console.error("Error writing to today.stock file: ", err);
        throw err;
      }
    } else {
      console.log("No valid stock found in the database. Yikes.");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const resetUserDaily = async () => {
  try {
    const losers = await User.find({ dailyPoints: 0 });
    const updateStreakPromises = losers.map((user) => {
      user.playedYesterday = false;
      user.currentStreak = 0;
      return user.save();
    });
    await Promise.all(updateStreakPromises);

    await User.updateMany({}, { $set: { dailyPoints: 0 } });
  } catch (error) {
    console.error("Error conducting daily reset of users: ", error);
  }
};

const resetUserWeekly = async () => {
  try {
    await User.updateMany({}, { $set: { weeklyPoints: 0 } });
  } catch (error) {
    console.error("Error conducting weekly reset of users: ", error);
  }
};

module.exports = { startDailyReset, startWeeklyReset };
