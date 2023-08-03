# Stockle v1.0.2

A stock market-themed wordle parody currently in open Alpha.

Feel free to check it out at http://stockle.ca!

### Deployment

Stockle runs on Node, but the Yahoo Finance web scraping API I'm using is written for Python. I used Docker to containerise this app into a Python virtual environment inside a node based image (please do not ask how long this took). The Docker image was pushed to Amazon's Elastic Container Registry and run on an EC2 instance. I used Nginx to reverse proxy HTTP requests to port 8080, where Stockle is running. The domain is being leased from Google for $17/year. I'm pretty sure I'm within the limits of AWS' free tier, but Jeff Bezos is a capitalist pig and AWS doesn't actually warn you if you exceed their free limits. So I guess I'll find out once my monthly bill arrives.

### Sources

CSS for popup window: https://www.youtube.com/watch?v=i8fAO_zyFAM&t=24s

Implementation of search bar autocomplete dropdown: https://www.youtube.com/watch?v=Jd7s7egjt30&t=3s

Implementation of board state using AppContext: https://www.youtube.com/watch?v=WDTNwmXUz2c

Server-side logic for user authentication and use of redux toolkit: https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1

Text underline-on-hover CSS animation: https://codepen.io/Coding_Journey/pen/poPjgyY

Code block for converting csv to JSON: http://techslides.com/convert-csv-to-json-in-javascript

Stock chart Library: https://canvasjs.com/download-html5-charting-graphing-library/?f=npm

Deploying to AWS: https://www.youtube.com/watch?v=YDNSItBN15w&t=139s

<b>And of course the MVP, ChatGPT.</b>

### Coming Soon

Enable HTTPS

Add hint feature (logo)
- https://www.benzinga.com/apis/cloud-product/company-logo-api/

Look into image hosters to store user profile pictures

Add easy/hard mode (toggle graph on/off, bonus points)

Search bar reccomendation priority
- Order by relevance but also market cap of company
- Account for typos

Expand list of "reasonable" stocks

Look for alternatives to Yahoo Finance API that return more consistent info
- Requried: ~6000 requests/day for little-to-no cost
