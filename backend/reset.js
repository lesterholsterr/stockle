// QUESTION: How can we trigger this once every 24 hours?

// 1. run fetch_basic_data.ipynb (requires ticker_list_refactored.csv to be in same directory)
// 2. select a random stock from valid.stock for today's answer
// 3. run fetch_historical_data.ipynb (requires today.stock to be in same directory)

// NOTE: we must await the above 2 scripts before proceeding

// 4. iterate through stock_basic_data.csv, send POST requests to create Stocks in DB
// QUESTION: Should we clear the DB of all Stock schemas (from prior day) before doing this?
// 5. iterate through stock_historical_data.csv, send POST requests to create HistoricalPrices in DB

const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const Stock = require("./models/stockModel");
const HistoricalPrice = require("./models/historyModel");
const STOCK_DATA_PATH = "/scripts/stock_basic_data.csv";
const HISTORICAL_DATA_PATH = "/scripts/stock_historical_data.csv";

const readFileAsync = promisify(fs.readFile);

const readCSV = async (filepath) => {
  try {
    const data = await readFileAsync(path.join(__dirname, filepath), "utf8");
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const csvToJSON = async (csv) => {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
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

const resetStockAndHistoricalData = () => {
  postStockData();
  postHistoricalData();
};

module.exports = { resetStockAndHistoricalData };
