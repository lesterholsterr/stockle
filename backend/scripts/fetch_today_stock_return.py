from yahooquery import Ticker
from config import LOCAL_DIR, TODAY_STOCK, TODAY_STOCK_RETURNS

f = open(LOCAL_DIR + TODAY_STOCK)
today_stock_str = f.readline().strip()
today_stock = Ticker(today_stock_str)

# .dropna() removes rows for dividend payments
hist = today_stock.history(period="max").dropna()
hist.to_csv(LOCAL_DIR + TODAY_STOCK_RETURNS)
print(f"Fetched historical data for {today_stock_str}")
