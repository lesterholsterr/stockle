import yfinance as yf

f = open("./backend/scripts/today.stock")
today_stock = yf.Ticker(f.readline().strip()) # .strip() removes surrounding whitespace

hist = today_stock.history(period="max").dropna() # .dropna() removes rows for dividend payments
hist.to_csv("./backend/scripts/stock_historical_data.csv")
print("Finished running fetch_historical_data.py")