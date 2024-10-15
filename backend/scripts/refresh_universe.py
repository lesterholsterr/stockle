from ftplib import FTP
import pandas as pd
from config import NASDAQ_FTP, SYMBOL_DIRECTORY, NASDAQ_NAMES, NYSE_NAMES, LOCAL_DIR, TICKER_LIST

'''
Description:
- Connect to NASDAQ FTP which provides up-to-date universe of securities listed on various exchanges
- Take only stocks listed on NASDAQ Global Select Market and NYSE
- Discard ETFs, preferred shares, rights, units, and warrants
- Save the tickers to ticker_list.csv
'''

ftp = FTP(NASDAQ_FTP)
ftp.login()
ftp.cwd(SYMBOL_DIRECTORY)

# NASDAQ listings
with open(LOCAL_DIR + NASDAQ_NAMES, 'wb') as local_file:
    ftp.retrbinary(f'RETR {NASDAQ_NAMES}', local_file.write)

df = pd.read_csv(LOCAL_DIR + NASDAQ_NAMES, delimiter='|')
df = df[(df["Market Category"] == "Q") & 
        (df["Test Issue"] == "N") & 
        (df["Financial Status"] == "N") & 
        (df["ETF"] == "N")]

tickers = df[['Symbol']]
tickers.to_csv(LOCAL_DIR + TICKER_LIST, index=False)

# NYSE listings
with open(LOCAL_DIR + NYSE_NAMES, 'wb') as local_file:
    ftp.retrbinary(f'RETR {NYSE_NAMES}', local_file.write)

df = pd.read_csv(LOCAL_DIR + NYSE_NAMES, delimiter='|')
filter_out = [
    r"\$",  # preferred
    r"\.R", # rights
    r"\.W", # warrants
    r"\.U", # units
    r"\.V", 
    r"\.Z"
]
pattern = '|'.join(filter_out)
df = df[~df["ACT Symbol"].str.contains(pattern)]
df = df[(~df["ACT Symbol"].str.contains(pattern, regex=True)) & 
        (df["Exchange"] == "N") & 
        (df["Test Issue"] == "N") & 
        (df["ETF"] == "N")]
tickers = df[['ACT Symbol']]
tickers.to_csv(LOCAL_DIR + TICKER_LIST, mode='a', header=False, index=False)
