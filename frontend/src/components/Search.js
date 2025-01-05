import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";

import { AppContext } from "../App";
import { Stock } from "../features/stock/Stock";
import { LocalStorageManipulator } from "../features/board/LocalStorageManipulator";
import { toast } from "react-toastify";
import { updateUser } from "../features/auth/authSlice";
import "../css/Search.css";

function Search({ mode, setPopup, gameOver, setGameOver, setShareResults }) {
  const [searchValue, setSearchValue] = useState("");
  const [stockList, setStockList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [clickedSuggestion, setClickedSuggestion] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const {
    board,
    setBoard,
    currAttempt,
    setCurrAttempt,
    todayStock,
  } = useContext(AppContext);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStockList = async () => {
      try {
        const response = await axios.get("/api/stock/list");
        setStockList(response.data);
      } catch (error) {
        console.error("Failed to fetch stock list:", error);
      }
    };

    fetchStockList();
  }, []);

  useEffect(() => {
    if (searchValue.length > 0 && !clickedSuggestion && isFocused) {
      const filteredStocks = stockList
        .filter((item) => {
          if (!item.name || !item.ticker) {
            return false;
          }
          const searchTerm = searchValue.toLowerCase();
          const stockName = item.name.toLowerCase();
          const stockTicker = item.ticker.toLowerCase();

          return (
            (stockTicker.startsWith(searchTerm) &&
              stockTicker !== searchTerm) ||
            (stockName.startsWith(searchTerm) && stockName !== searchTerm)
          );
        })
        .slice(0, 10);

      setFilteredList(filteredStocks);
    } else {
      setFilteredList([]);
    }
  }, [searchValue, clickedSuggestion, stockList, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredList([]);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setSearchValue(event.target.value || "");
    setIsFocused(true);
    if (clickedSuggestion) {
      setClickedSuggestion(false);
    }
    if (!event.target.value) {
      setFilteredList([]);
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
    setFilteredList([]);

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
        `Stockle ${currAttempt + 1}/6\n`
          .concat(localStorageManipulator.shareResults)
          .concat("\nhttps://playstockle.com/")
      );
      setPopup("win");
    } else if (currAttempt === 5) {
      setGameOver(true);
      localStorageManipulator.setGameOver(true);
      updateStats(false);
      setShareResults(
        `Stockle X/6\n`
          .concat(localStorageManipulator.shareResults)
          .concat("\nhttps://playstockle.com/")
      );
      setPopup("lose");
    } else {
      setShareResults(localStorageManipulator.shareResults);
    }
  };

  const updateStats = async (isWin) => {
    const points = calculatePoints(isWin);

    const newGuessDistribution = [...user.guessDistribution];
    if (isWin) {
      newGuessDistribution[currAttempt + 1] =
        newGuessDistribution[currAttempt + 1] + 1;
    }

    const updatedUser = {
      ...cloneDeep(user),
      gamesPlayed: user.gamesPlayed + 1,
      dailyPoints: points,
      weeklyPoints: points,
      totalPoints: points,
      gamesWon: isWin ? user.gamesWon + 1 : user.gamesWon,
      guessDistribution: newGuessDistribution,
      currentStreak:
        user.playedYesterday || user.currentStreak === 0
          ? 1
          : -user.currentStreak,
      maxStreak: Math.max(
        user.maxStreak,
        user.playedYesterday || user.currentStreak === 0
          ? user.currentStreak + 1
          : 1
      ),
      playedYesterday: true,
    };

    console.log("Sending updated user to Redux:", updatedUser);
    await dispatch(updateUser(updatedUser)).unwrap();
  };

  // Scoring System:
  // 800 - (guessesUsed * 100) +
  // min(200, currentStreak * 20) +
  // X if no logo hint used +
  // Y if hard mode enabled
  const calculatePoints = (isWin) => {
    const pointsFromGuesses = isWin ? 800 - (currAttempt + 1) * 100 : 100;
    const pointsFromStreak = user.playedYesterday
      ? Math.min(200, user.currentStreak * 20)
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
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <div className={`dropdown-${mode}`}>
          {filteredList.map((item) => (
            <div
              className="dropdown-row"
              onClick={() => {
                setSearchValue(item.ticker);
                setClickedSuggestion(true);
                setFilteredList([]);
                setIsFocused(false);
              }}
              key={item.ticker}
            >
              {`${item.name} (${item.ticker})`}
            </div>
          ))}
        </div>
      </div>
      <div className="search-inner">
        {gameOver ? (
          <input type="text" disabled="disabled" />
        ) : (
          <input
            type="text"
            value={searchValue ?? ""}
            onChange={onChange}
            onFocus={() => {
              if (searchValue.length > 0) {
                setIsFocused(true);
                setClickedSuggestion(false);
              }
            }}
          />
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
