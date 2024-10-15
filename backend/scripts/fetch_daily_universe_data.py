import json
import pandas as pd
from yahooquery import Ticker
from concurrent.futures import ThreadPoolExecutor, as_completed
from config import LOCAL_DIR, TICKER_LIST, UNIVERSE_DATA

ticker_df = pd.read_csv(LOCAL_DIR + TICKER_LIST)
tickers = ticker_df['Symbol'].tolist()[:10]
stock_info = []

def fetch_stock_info(ticker):
    try:
        stock = Ticker(ticker)
        modules = 'summaryProfile price defaultKeyStatistics financialData'
        return {ticker : stock.get_modules(modules)[ticker]}
    except Exception as e:
        print(f"{ticker.ljust(6)} does not exist on Yahoo Finance: {e}")
        return None

# Runtime: ~4 minutes
with ThreadPoolExecutor(max_workers=10) as executor:
    futures = {executor.submit(fetch_stock_info, ticker): ticker for ticker in tickers}
    for future in as_completed(futures):
        result = future.result()
        if result:
            stock_info.append(result)
            # Update other fields as needed

stock_info_json = json.dumps(stock_info, indent=4)
with open(LOCAL_DIR + UNIVERSE_DATA, 'w') as json_file:
    json_file.write(stock_info_json)
print("Finished running fetch_daily_universe_data.py")
