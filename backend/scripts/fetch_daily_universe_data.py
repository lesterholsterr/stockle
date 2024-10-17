import os
import json
from dotenv import load_dotenv
from datetime import datetime, timezone
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from yahooquery import Ticker
from pymongo import MongoClient, UpdateOne
from pymongo.errors import BulkWriteError
from config import LOCAL_DIR, TICKER_LIST, UNIVERSE_DATA

load_dotenv('../../.env')
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client['stockle']
collection = db['stockpile']

ticker_df = pd.read_csv(LOCAL_DIR + TICKER_LIST)
tickers = ticker_df['Symbol'].tolist()
stock_info = []

def fetch_stock_info(ticker):
    try:
        stock = Ticker(ticker)
        modules = 'summaryProfile price defaultKeyStatistics financialData'
        data = stock.get_modules(modules)
        return {
            "_id": ticker,
            "defaultKeyStatistics": data[ticker].get('defaultKeyStatistics', {}),
            "summaryProfile": data[ticker].get('summaryProfile', {}),
            "price": data[ticker].get('price', {}),
            "financialData": data[ticker].get('financialData', {}),
            "lastModified": datetime.now(timezone.utc)
        }
    except Exception as e:
        print(f"{ticker.ljust(6)} does not exist on Yahoo Finance: {e}")
        return None

# Runtime: ~3 minutes
with ThreadPoolExecutor(max_workers=10) as executor:
    futures = {executor.submit(fetch_stock_info, ticker): ticker for ticker in tickers}
    for future in as_completed(futures):
        result = future.result()
        if result:
            stock_info.append(result)

if stock_info:
    valid_stock_info = [info for info in stock_info if info is not None]
    operations = []
    for info in valid_stock_info:
        operations.append(
            UpdateOne(
                {"_id": info["_id"]},
                {"$set": info},
                upsert=True
            )
        )
    
    try:
        # Perform bulk upsert
        result = collection.bulk_write(operations, ordered=False)
        print(f"Upserted {result.upserted_count} new records and modified {result.modified_count} existing records in stockpile")
    except BulkWriteError as bwe:
        print(f"Bulk write operation partially failed. {bwe.details['nInserted']} inserted, {bwe.details['nModified']} modified, {bwe.details['nUpserted']} upserted.")
        print(f"Errors: {bwe.details['writeErrors']}")
