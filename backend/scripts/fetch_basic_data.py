import yfinance as yf
import pandas as pd

ticker_df = pd.read_csv("./backend/scripts/ticker_list_refactored.csv")
tickers = ticker_df['Symbol'].tolist()
names = ticker_df['Company Name'].tolist()

# Column names in snake_case for convert-to-JSON compatibility
stock_info = pd.DataFrame(columns=['ticker', 'name', 'sector', 'market_cap', 'share_price', 'revenue', 'net_income', 'summary'])
stock_info['ticker'] = tickers

# Remove commas from company names to not fuck up the CSV file
for index, row in stock_info.iterrows():
    company_name = names[index]
    if "," in company_name:
        company_name = company_name.replace(",", " ")
    row['name'] = company_name

# Runtime: ~30 minutes
for i in range(len(tickers)):
    try:
        ticker_info = yf.Ticker(str(tickers[i])).info
        
        try:
            stock_info['sector'][i] = ticker_info['sector']
            stock_info['market_cap'][i] = ticker_info['marketCap']
            stock_info['share_price'][i] = ticker_info['currentPrice']
            stock_info['revenue'][i] = ticker_info['totalRevenue']
            stock_info['net_income'][i] = ticker_info['netIncomeToCommon']
        except:
            print(tickers[i].ljust(6), " is missing stock info")
        try:
            stock_info['summary'][i] = ticker_info['longBusinessSummary']
        except:
            print(tickers[i].ljust(6), " is missing a summary")
    except: 
        print(tickers[i].ljust(6), " does not exist on Yahoo Finance")

stock_info = stock_info.dropna()
stock_info.to_csv("./backend/scripts/stock_basic_data.csv")
print("Finished running fetch_basic_data.py")