# Stockle

A stock market themed wordle clone I am attempting to build.

### Sources

Popup window CSS: https://www.youtube.com/watch?v=i8fAO_zyFAM&t=24s

Search bar suggestions implementation: https://www.youtube.com/watch?v=Jd7s7egjt30&t=3s

Board styling and use of AppContext: https://www.youtube.com/watch?v=WDTNwmXUz2c

Server-side logic for user authentication: https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1

Text underline-on-hover CSS animation: https://codepen.io/Coding_Journey/pen/poPjgyY

Code block for converting csv to JSON: http://techslides.com/convert-csv-to-json-in-javascript

Stock chart API: https://canvasjs.com/download-html5-charting-graphing-library/?f=npm

(Maybe) Dropdown menu: https://www.youtube.com/watch?v=jaMgXmrk29M

### TODO

#### Front End

Once API is finished:
- Ensure Graph.js, Stock.js, and Search.js are using axios to make requests rather than relying on the temporary static json file

Add hint feature (logo)
- https://www.benzinga.com/apis/cloud-product/company-logo-api/

Add easy/hard mode (toggle graph on/off) and dark/light mode

#### Back End

Create async functions to handle api/history GET and POST requests

Test api/stock and api/history GET/POST requests

Write code for reset.js (datetime library?)

Make a list of "reasonable" stocks to choose from

Look into image hosters to store user profile pictures

Schema and server-side logic for storing statistics

#### Long Term

Deploy the damn thing!

Search bar reccomendation priority
