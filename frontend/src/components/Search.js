import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";

import { AppContext } from "../App";
import { Stock } from "../features/stock/Stock";
import { LocalStorageManipulator } from "../features/board/LocalStorageManipulator";
import { toast } from "react-toastify";
import { updateUser } from "../features/auth/authSlice";
import "../css/Search.css";

function Search({ mode, setPopup, gameOver, setGameOver }) {
  const [searchValue, setSearchValue] = useState("");
  const [universeList, setUniverseList] = useState([]);
  const [clickedSuggestion, setClickedSuggestion] = useState(false);
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
    const fetchUniverseList = async () => {
      const response = await axios.get("/api/stock/list");
      setUniverseList(response.data);
    };

    if (!clickedSuggestion) {
      fetchUniverseList();
    }
  }, [clickedSuggestion]);

  useEffect(() => {
    const boardState = JSON.parse(localStorage.getItem("board state"));
    const newBoard = [...board];
    var line = 0;
    if (boardState) {
      for (const key in boardState) {
        if (boardState.hasOwnProperty(key)) {
          const attemptResults = boardState[key];
          for (var i = 0; i < 6; i++) {
            newBoard[line][i] = attemptResults[i];
          }
        }
        line++;
      }
    }
    setBoard(newBoard);
    setCurrAttempt(line);
  }, []);

  const onChange = (event) => {
    setSearchValue(event.target.value);
    if (clickedSuggestion) {
      setClickedSuggestion(false);
    }
  };

  const onSearch = async (searchTerm) => {
    if (!user) {
      toast.error("Please log in to play", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setSearchValue("");

    let results;
    try {
      const response = await axios.get(
        `/api/stock/${searchTerm.toUpperCase()}`
      );
      const stockData = response.data;
      const searchedStock = new Stock(searchTerm, stockData);
      results = searchedStock.compare(todayStock);
    } catch (error) {
      toast.error("Failed to fetch stock data", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const newBoard = generateNewBoard(results);
    setBoard(newBoard);
    const localStorageManipulator = new LocalStorageManipulator();

    setCurrAttempt(currAttempt + 1);
    try {
      localStorageManipulator.setUserGuess(results, currAttempt);
      localStorageManipulator.setShareResult(results);
    } catch (error) {
      console.error("Error updating local storage:", error);
    }

    setTimeout(() => {
      winLossCheck(results, localStorageManipulator);
    }, 100);
  };

  const generateNewBoard = (results) => {
    const newBoard = [...board];
    newBoard[currAttempt][0] = results[0];
    newBoard[currAttempt][1] = results[1];
    newBoard[currAttempt][2] = results[2];
    newBoard[currAttempt][3] = results[3];
    newBoard[currAttempt][4] = results[4];
    newBoard[currAttempt][5] = results[5];
    return newBoard;
  };

  const winLossCheck = (results, localStorageManipulator) => {
    if (results[0] === todayStock.ticker) {
      setGameOver(true);
      localStorageManipulator.setGameOver(true);
      updateStats(true);
      setShareResults(
        `Stockle ${currAttempt + 1}/6\n`.concat(
          localStorageManipulator.shareResults
        )
      );
      setPopup("win");
    } else if (currAttempt === 5) {
      setGameOver(true);
      localStorageManipulator.setGameOver(true);
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
      updatedUser.weeklyPoints += points;
      updatedUser.totalPoints += points;
      updatedUser.guessDistribution[currAttempt] += 1;
    } else {
      updatedUser.dailyPoints += points;
      updatedUser.weeklyPoints += points;
      updatedUser.totalPoints += points;
    }
    updatedUser.playedYesterday
      ? (updatedUser.currentStreak += 1)
      : (updatedUser.currentStreak = 1);
    updatedUser.maxStreak = Math.max(
      updatedUser.maxStreak,
      updatedUser.currentStreak
    );
    updatedUser.playedYesterday = true;

    dispatch(updateUser(updatedUser));
  };

  // Scoring System:
  // 800 - (guessesUsed * 100) +
  // min(100, currentStreak * 20) +
  // X if no logo hint used +
  // Y if hard mode enabled
  const calculatePoints = (isWin) => {
    const pointsFromGuesses = isWin ? 800 - currAttempt * 100 : 100;
    const pointsFromStreak = user.playedYesterday
      ? Math.min(100, user.currentStreak * 20)
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
        <div className={`dropdown-${mode}`}>
          {universeList
            .filter((item) => {
              if (!item.name || !item.ticker) {
                return false;
              }
              const searchTerm =
                searchValue !== "" ? searchValue.toLowerCase() : null;
              const stockName = item.name.toLowerCase();
              const stockTicker = item.ticker.toLowerCase();

              return (
                searchTerm &&
                ((stockTicker.startsWith(searchTerm) &&
                  stockTicker !== searchTerm.toLowerCase()) ||
                  (stockName.startsWith(searchTerm) &&
                    stockName !== searchTerm.toLowerCase()))
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                className="dropdown-row"
                onClick={() => {
                  setSearchValue(item.ticker);
                  setClickedSuggestion(true);
                  setUniverseList([]);
                }}
                key={item.name}
              >
                {`${item.name} (${item.ticker})`}
              </div>
            ))}
        </div>
      </div>
      <div className="search-inner">
        {gameOver ? (
          <>
            <input type="text" disabled="disabled" />
          </>
        ) : (
          <>
            <input type="text" value={searchValue} onChange={onChange} />
          </>
        )}
        <button
          className={`fancy-button-${mode}`}
          onClick={() => onSearch(searchValue)}
        >
          Guess
        </button>
      </div>
    </div>
  );
}

export default Search;
