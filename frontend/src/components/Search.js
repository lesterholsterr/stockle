import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";

import { AppContext } from "../App";
import { Stock } from "../features/stock/Stock";
import { LocalStorageManipulator } from "../features/board/LocalStorageManipulator";
import { updateUser } from "../features/auth/authSlice";
import "../css/Search.css";

var stock_info = [];
(async () => {
  const response = await axios.get("/api/stock/all");
  stock_info = response.data;
})();

function Search({ mode, setPopup }) {
  const [searchValue, setSearchValue] = useState("");
  const {
    board,
    setBoard,
    currAttempt,
    setCurrAttempt,
    todayStock,
    setShareResults,
  } = useContext(AppContext);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const newBoard = [...board];
    const boardState = JSON.parse(localStorage.getItem("board state"));
    var attempt = 0;
    for (const key in boardState) {
      if (boardState.hasOwnProperty(key)) {
        const attemptResults = boardState[key];
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

    setBoard(generateNewBoard(results));
    setCurrAttempt(currAttempt + 1);

    const localStorageManipulator = new LocalStorageManipulator();
    localStorageManipulator.setNewAttempt(results, currAttempt);
    localStorageManipulator.setShareResult(results);

    winLossCheck(results, localStorageManipulator);
  };

  const generateNewBoard = (results) => {
    const newBoard = [...board];
    newBoard[currAttempt - 1][0] = results[0];
    newBoard[currAttempt - 1][1] = results[1];
    newBoard[currAttempt - 1][2] = results[2];
    newBoard[currAttempt - 1][3] = results[3];
    newBoard[currAttempt - 1][4] = results[4];
    newBoard[currAttempt - 1][5] = results[5];

    return newBoard;
  };

  const winLossCheck = (results, localStorageManipulator) => {
    if (results[0] === todayStock.ticker) {
      updateStats(true);
      setShareResults(
        `Stockle ${currAttempt}/6\n`.concat(
          localStorageManipulator.shareResults
        )
      );
      setPopup("win");
    } else if (currAttempt === 6) {
      updateStats(false);
      setShareResults(
        `Stockle X/6\n`.concat(localStorageManipulator.shareResults)
      );
      setPopup("lose");
    } else {
      setShareResults(localStorageManipulator.shareResults);
    }
  };

  const updateStats = async (isWin) => {
    var updatedUser = cloneDeep(user);
    const points = calculatePoints(isWin);

    updatedUser.gamesPlayed += 1;
    if (isWin) {
      updatedUser.gamesWon += 1;
      updatedUser.dailyPoints += points;
      updatedUser.totalWeeklyPoints -= updatedUser.weeklyPoints.shift();
      updatedUser.weeklyPoints.push(points);
      updatedUser.totalWeeklyPoints += points;
      updatedUser.totalPoints += points;
    } else {
      updatedUser.dailyPoints += points;
      updatedUser.totalWeeklyPoints -= updatedUser.weeklyPoints.shift();
      updatedUser.weeklyPoints.push(points);
      updatedUser.totalWeeklyPoints += points;
      updatedUser.totalPoints += points;
    }
    updatedUser.playedYesterday
      ? (updatedUser.currentStreak += 1)
      : (updatedUser.currentStreak = 1);
    updatedUser.maxStreak = Math.max(
      updatedUser.maxStreak,
      updatedUser.currentStreak
    );
    updatedUser.guessDistribution[currAttempt] += 1;
    updatedUser.playedYesterday = true;

    dispatch(updateUser(updatedUser));
  };

  // Scoring System:
  // 800 - (guessesUsed * 100) +
  // max(100, currentStreak * 20) +
  // X if no logo hint used +
  // Y if hard mode enabled
  const calculatePoints = (isWin) => {
    const pointsFromGuesses = isWin ? 800 - currAttempt * 100 : 0;
    const pointsFromStreak = user.playedYesterday
      ? Math.max(100, user.currentStreak * 20)
      : 0;
    const pointsFromNoHint = 0; // Not implemented yet
    const pointsFromHardMode = 0; // Not implemented yet

    return (
      pointsFromGuesses +
      pointsFromStreak +
      pointsFromNoHint +
      pointsFromHardMode
    );
  };

  return (
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
        <button className={`fancy-button-${mode}`} onClick={() => onSearch(searchValue)}>Guess</button>
      </div>
    </div>
  );
}

export default Search;
