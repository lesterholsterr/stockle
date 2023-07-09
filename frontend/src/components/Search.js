import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Stock } from "../Stock";
import "../css/Search.css";

var stock_info = require("../stock_info.json");

function Search({ setPopup, share_results }) {
  const [searchValue, setSearchValue] = useState("");
  const {
    board,
    setBoard,
    currAttempt,
    setCurrAttempt,
    todayStock,
    shareResults,
    setShareResults,
  } = useContext(AppContext);

  useEffect(() => {
    // Note to future me: The local storage thing pretty much works now. However, the results array that is
    // returned by Stock.js contains a boolean as the first element, so the information of what ticker was
    // guessed is permanently lost. Should replace the boolean with a string, and manually validate in Search.js 
    // (this file) whether the player has won.
    const newBoard = [...board];
    console.log(newBoard);
    const boardState = JSON.parse(localStorage.getItem("board state"));
    var attempt = 0;
    for (const key in boardState) {
      if (boardState.hasOwnProperty(key)) {
        const attemptResults = boardState[key];
        console.log(`Key: ${key}, Value: ${attemptResults}`);
        for (var i = 0; i < 6; i++) {
          newBoard[attempt][i] = attemptResults[i];
        }
      }
      attempt++;
    }
    setBoard(newBoard);
    setCurrAttempt(attempt + 1);
  }, []);

  const onChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setSearchValue("");
    const searchedStock = new Stock(searchTerm);
    const results = searchedStock.compare(todayStock);

    var boardState = JSON.parse(localStorage.getItem("board state"));
    if (boardState == null) {
      localStorage.setItem("board state", JSON.stringify({ 0: results }));
    } else {
      Object.assign(boardState, { [currAttempt]: results });
      localStorage.setItem("board state", JSON.stringify(boardState));
    }

    const newBoard = [...board];
    newBoard[currAttempt][0] = searchedStock.ticker;
    newBoard[currAttempt][1] = results[1];
    newBoard[currAttempt][2] = results[2];
    newBoard[currAttempt][3] = results[3];
    newBoard[currAttempt][4] = results[4];
    newBoard[currAttempt][5] = results[5];
    setBoard(newBoard);
    setCurrAttempt(currAttempt + 1);

    const shareResultRow =
      results[1].charAt(results[1].length - 1) +
      results[2].charAt(results[2].length - 2) +
      results[3].charAt(results[3].length - 2) +
      results[4].charAt(results[4].length - 2) +
      results[5].charAt(results[5].length - 2) +
      "\n";
    if (results[0]) {
      setShareResults(
        `Stockle ${currAttempt + 1}/6\n`
          .concat(shareResults)
          .concat(shareResultRow)
      );
      setPopup("win");
    } else if (currAttempt === 5) {
      setShareResults(
        `Stockle X/6\n`.concat(shareResults).concat(shareResultRow)
      );
      setPopup("lose");
    } else {
      setShareResults(shareResults.concat(shareResultRow));
    }
    localStorage.setItem("share result", JSON.stringify(shareResults));
  };

  return (
    <div className="app">
      <div className="search-container">
        <div className="dropdown-wrapper">
          <div className="dropdown">
            {stock_info
              .filter((item) => {
                const searchTerm = searchValue.toLowerCase();
                const stockName = item.name.toLowerCase();
                const stockTicker = item.ticker.toLowerCase();

                return (
                  searchTerm &&
                  (stockTicker.startsWith(searchTerm) ||
                    (stockName.startsWith(searchTerm) &&
                      stockName !== searchTerm))
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  className="dropdown-row"
                  onClick={() => setSearchValue(item.name)}
                  key={item.name}
                >
                  {`${item.name} (${item.ticker})`}
                </div>
              ))}
          </div>
        </div>
        <div className="search-inner">
          <input type="text" value={searchValue} onChange={onChange} />
          <button onClick={() => onSearch(searchValue)}>Guess</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
