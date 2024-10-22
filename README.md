# Stockle v0.1.0 - Bear Trap

A stock market-themed wordle parody currently in open Alpha. After almost a year hiatus, I'm back. You thought this project was left for dead, but it was just a [bear trap](https://www.investopedia.com/terms/b/beartrap.asp) 😉.

Check it out at https://playstockle.com*.

Dev Note (10/21/2024): The front-end looks exactly the same as it did a year ago, but there has been a significant overhaul of the backend and database that paves the way for new features including power-ups and a reworked points system. Stay tuned!

### Deployment

Stockle runs on Node, but the Yahoo Finance API wrapper I use is written for Python. I used Docker to containerise this app into a Python virtual environment inside a node based image (please do not ask how long this took). The Docker image was pushed to Amazon's Elastic Container Registry. An ECS container is running this image on a single EC2 t2.micro instance, so please don't DDOS me. The domain is registered with Amazon's Route 53 and points to a Cloudfront distribution that has the EC2 instance as its origin. Nginx reverse proxies HTTP requests to port 8080, where the server is listening for inbound traffic.

### Sources

CSS for popup window: https://www.youtube.com/watch?v=i8fAO_zyFAM&t=24s

Implementation of search bar autocomplete dropdown: https://www.youtube.com/watch?v=Jd7s7egjt30&t=3s

Implementation of board state using AppContext: https://www.youtube.com/watch?v=WDTNwmXUz2c

Server-side logic for user authentication and use of redux toolkit: https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1

Text underline-on-hover CSS animation: https://codepen.io/Coding_Journey/pen/poPjgyY

Code block for converting csv to JSON: http://techslides.com/convert-csv-to-json-in-javascript

Stock chart Library: https://canvasjs.com/download-html5-charting-graphing-library/?f=npm

Deploying to AWS: https://www.youtube.com/watch?v=YDNSItBN15w&t=139s

<b>And the MVPs: ChatGPT, Github Copilot, and Claude Sonnet.</b>

### Coming Soon

- Find a better library for graphs (hopefully)

- Overhaul points system

- Powerups
  - Logo: https://www.benzinga.com/apis/cloud-product/company-logo-api/
  - Filter out all stocks that don't meet current criteria
  - Add a metric to the board
  - Reveal a metric about the company

- Image hoster to store user profile pictures

- Improved search bar
  - Order by relevance and market cap of company
  - Account for typos
