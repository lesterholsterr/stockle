# Stockle

A stock market themed wordle clone I am attempting to build.

### Sources

CSS for popup window: https://www.youtube.com/watch?v=i8fAO_zyFAM&t=24s

Implementation of search bar autocomplete dropdown: https://www.youtube.com/watch?v=Jd7s7egjt30&t=3s

Implementation of board state using AppContext: https://www.youtube.com/watch?v=WDTNwmXUz2c

Server-side logic for user authentication: https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1

Text underline-on-hover CSS animation: https://codepen.io/Coding_Journey/pen/poPjgyY

Code block for converting csv to JSON: http://techslides.com/convert-csv-to-json-in-javascript

Stock chart API: https://canvasjs.com/download-html5-charting-graphing-library/?f=npm

### TODO

#### Front End

Clear board state and share result in local storage at EOD

Add a boolean state passed to search.js that disables once the user either wins or loses

#### Back End

Work on reset.js
- datetime library
- figure out how to run ipynb scripts from JS
- reset streaks for users who did not play by EOD
- reset weekly scores by EOW (also update weeklypoints in user schema)

#### Long Term

Deploy the damn thing!

Search bar reccomendation priority
- Order by relevance but also market cap of company
- Account for typos

Add hint feature (logo)
- https://www.benzinga.com/apis/cloud-product/company-logo-api/

Look into image hosters to store user profile pictures

Make light/dark mode persist through refresh

Add easy/hard mode (toggle graph on/off)

Expand list of "reasonable" stocks
