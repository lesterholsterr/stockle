import os
import sys
import pandas as pd
from ftplib import FTP
from yahooquery import Ticker
from pymongo import MongoClient
from dotenv import load_dotenv

print("Diagnostic script running on: ", sys.executable)

x = pd.DataFrame()

try:
    NASDAQ_FTP = 'ftp.nasdaqtrader.com'
    ftp = FTP(NASDAQ_FTP)
    ftp.login()
except:
    print("Failed to connect to NASDAQ FTP")
    exit()

try:
    aapl = Ticker('AAPL')
    data = aapl.summary_detail
except:
    print("yahooquery not functioning")
    exit()

try:
    load_dotenv()
    mongo_uri = os.getenv('MONGO_URI')
    client = MongoClient(mongo_uri)
    db = client['stockle']
    collection = db['stockpile']
    
    result = collection.find_one({})
except:
    print("Failed to connect to MongoDB")
    exit()

print("Libraries installed and imported correctly")
