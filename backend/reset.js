// QUESTION: How can we trigger this once every 24 hours?

// 1. run fetch_basic_data.ipynb (requires ticker_list_refactored.csv to be in same directory)
// 2. select a random stock from valid.stock for today's answer
// 3. run fetch_historical_data.ipynb (requires today.stock to be in same directory)

// NOTE: we must await the above 2 scripts before proceeding

// 4. iterate through stock_basic_data.csv, send POST requests to create Stocks in DB
// QUESTION: Should we clear the DB of all Stock schemas (from prior day) before doing this?
// 5. iterate through stock_historical_data.csv, send POST requests to create HistoricalPrices in DB
