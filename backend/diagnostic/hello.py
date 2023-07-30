import yfinance as yf
import pandas as pd
import sys

print("Diagnostic script running on: ", sys.executable)

x = yf.Ticker('AAPL')
y = pd.DataFrame()

print("Libraries installed and imported correctly")
