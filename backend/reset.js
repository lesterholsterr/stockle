const { promisify } = require("util");
const { spawn } = require("child_process");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);
const path = require("path");

const Stock = require("./models/stockModel");
const User = require("./models/userModel");
const HistoricalPrice = require("./models/historyModel");
const STOCK_DATA_SCRIPT = path.join(__dirname, "/scripts/fetch_basic_data.py");
const STOCK_DATA_PATH = "./scripts/stock_basic_data.csv";
const HISTORICAL_DATA_SCRIPT = path.join(__dirname, "/scripts/fetch_historical_data.py");
const HISTORICAL_DATA_PATH = "./scripts/stock_historical_data.csv";

const startDailyReset = async () => {
  // Step 1 - run fetch_basic_data.ipynb (requires ticker_list_refactored.csv to be in same directory)
  await runPythonScript(STOCK_DATA_SCRIPT);

  // Step 2 - select a random stock from valid.stock and write it to today.stock
  await chooseNewStock();

  // Step 3 - run fetch_historical_data.ipynb (requires today.stock to be in same directory)
  await runPythonScript(HISTORICAL_DATA_SCRIPT);

  // Step 4 - iterate through stock_basic_data.csv, create Stocks in DB
  // await postStockData();

  // Step 5 - iterate through stock_historical_data.csv, create HistoricalPrices in DB
  // await postHistoricalData();

  // Step 6 - Iterate through all users in the DB, discontinue streaks and set dailyPoints to 0
  await resetUserDaily();
};

const startWeeklyReset = async () => {
  // Iterate through all users in the DB and set weeklyPoints to 0
  // Since daily reset also runs at the end of the week, we don't need to do too much else
  await resetUserWeekly();
};

const runPythonScript = async (executablePath) => {
  console.log("RUNNING ", executablePath);
  const childPython = spawn("python", [executablePath]);

  childPython.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  childPython.stdout.on("err", (data) => {
    console.log(`stderr: ${data}`);
  });
  childPython.stdout.on("close", (code) => {
    console.log(`python script exited with code ${code}`);
  });
};

const readCSV = async (filepath) => {
  try {
    const data = await readFileAsync(path.join(__dirname, filepath), "utf8");
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const chooseNewStock = async () => {
  const tickerData = await readCSV("valid.stock");
  const tickers = tickerData
    .split("\n")
    .filter((ticker) => ticker.trim() !== "");
  const randomIndex = Math.floor(Math.random() * tickers.length);
  const todayStock = tickers[randomIndex];
  fs.writeFile("./backend/scripts/today.stock", todayStock, (err) => {
    if (err) {
      console.error("Error writing to today.stock file: ", err);
      return;
    }
    console.log(`Today's stock is $${todayStock}`);
  });
};

const csvToJSON = async (csv) => {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      if (j === headers.length - 1) {
        // Summaries contain commas, so csvToJSON cuts the summary off at the first comma.
        // Hence the special treatment.
        const summary = currentline.slice(headers.length - 1).join("");
        obj[headers[j]] = summary;
      } else {
        obj[headers[j]] = currentline[j];
      }
    }

    result.push(obj);
  }

  return result;
};

const postStockData = async () => {
  try {
    const stockData = await readCSV(STOCK_DATA_PATH);
    var stockDataJSON = await csvToJSON(stockData);

    const deleted = await Stock.deleteMany({});
    console.log(
      `Deleted ${deleted.deletedCount} documents from the stock collection.`
    );

    stockDataJSON.forEach(addStock);
  } catch (err) {
    throw new Error(err);
  }
};

const addStock = async (stock) => {
  try {
    if (
      stock.ticker === undefined ||
      stock.name === undefined ||
      stock.sector === undefined ||
      stock.market_cap === undefined ||
      stock.revenue === undefined ||
      stock.net_income === undefined ||
      stock.summary === undefined
    ) {
      return;
    }

    await Stock.create({
      ticker: stock.ticker,
      name: stock.name,
      sector: stock.sector,
      market_cap: stock.market_cap,
      share_price: stock.share_price,
      revenue: stock.revenue,
      net_income: stock.net_income,
      summary: stock.summary,
    });
  } catch (err) {
    console.log(stock);
    throw new Error(err);
  }
};

const postHistoricalData = async () => {
  try {
    const historicalData = await readCSV(HISTORICAL_DATA_PATH);
    const historicalDataJSON = await csvToJSON(historicalData);

    const deleted = await HistoricalPrice.deleteMany({});
    console.log(
      `Deleted ${deleted.deletedCount} documents from the historicalprices collection`
    );

    subset = [historicalDataJSON[0], historicalDataJSON[1]];
    historicalDataJSON.forEach(addHistoricalPrice);
  } catch (err) {
    throw new Error(err);
  }
};

const addHistoricalPrice = async (history) => {
  try {
    if (
      history.Date === undefined ||
      history.Open === undefined ||
      history.High === undefined ||
      history.Low === undefined ||
      history.Close === undefined ||
      history.Volume === undefined
    ) {
      return;
    }

    await HistoricalPrice.create({
      date: Date.parse(history.Date),
      open: history.Open,
      high: history.High,
      low: history.Low,
      close: history.Close,
      volume: history.Volume,
    });
  } catch (err) {
    console.log(history);
    throw new Error(err);
  }
};

const resetUserDaily = async () => {
  try {
    const losers = await User.find({ dailyPoints: 0 });
    const updateStreakPromises = losers.map((user) => {
      user.playedYesterday = false;
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
