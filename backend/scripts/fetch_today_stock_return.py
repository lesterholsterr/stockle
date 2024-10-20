import os
import warnings
from dotenv import load_dotenv
from yahooquery import Ticker
from pymongo import MongoClient, UpdateOne
from pymongo.errors import BulkWriteError
from datetime import datetime, date, timezone
import pytz
from config import LOCAL_DIR, TODAY_STOCK, TODAY_STOCK_RETURNS

load_dotenv('../../.env')
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client['stockle']
collection = db['dailyreturns']

with open(LOCAL_DIR + TODAY_STOCK, 'r') as f:
    ticker = f.readline().strip()

stock = Ticker(ticker)
with warnings.catch_warnings():
    warnings.simplefilter(action='ignore', category=FutureWarning)
    hist = stock.history(period="max").dropna()
hist.to_csv(LOCAL_DIR + TODAY_STOCK_RETURNS)
print(f"Fetched historical data for {ticker}")

hist.reset_index(inplace=True)
records = hist.to_dict('records')

# Clear the database
collection.delete_many({})

# Prepare bulk upsert operations
operations = []
for record in records:
    if isinstance(record['date'], date):
        record['date'] = datetime.combine(record['date'], datetime.min.time(), tzinfo=timezone.utc)
    
    record_id = f"{ticker}_{record['date'].strftime('%Y-%m-%d')}"
    
    doc = {
        "_id": record_id,
        "ticker": ticker,
        "date": record['date'],
        "open": record['open'],
        "high": record['high'],
        "low": record['low'],
        "close": record['close'],
        "volume": record['volume'],
        "adjclose": record['adjclose'],
        "lastModified": datetime.now(pytz.timezone('America/New_York'))
    }
    
    operations.append(
        UpdateOne(
            {"_id": record_id},
            {"$set": doc},
            upsert=True
        )
    )

try:
    result = collection.bulk_write(operations, ordered=False)
    print(f"Upserted {result.upserted_count} new records and modified {result.modified_count} existing records for {ticker}")
except BulkWriteError as bwe:
    print(f"Bulk write operation partially failed for {ticker}. {bwe.details['nInserted']} inserted, {bwe.details['nModified']} modified, {bwe.details['nUpserted']} upserted.")
    print(f"Errors: {bwe.details['writeErrors']}")
