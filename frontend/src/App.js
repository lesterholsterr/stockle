import { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Alpha from "./components/popup/Alpha";
import Instructions from "./components/popup/Instructions";
import Statistics from "./components/popup/Statistics";
import Settings from "./components/popup/Settings";
import Login from "./components/popup/Login";
import WinLoss from "./components/popup/WinLoss";

import Header from "./components/Header";
import Graph from "./components/Graph";
import Board from "./components/Board";
import Search from "./components/Search";

import { Stock } from "./features/stock/Stock.js";
import { boardDefault } from "./features/board/BoardState";
import { LocalStorageManipulator } from "./features/board/LocalStorageManipulator";

export const AppContext = createContext();

function App() {
  const localStorageManipulator = new LocalStorageManipulator();

  // Popup window status
  const [popup, setPopup] = useState("alpha");

  // Dark/light mode status
  const initialMode = localStorageManipulator.getMode();
  const [mode, setMode] = useState(initialMode);
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  useEffect(() => {
    document.body.className = mode;
  });

  // Board State
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState(0);
  const [shareResults, setShareResults] = useState("");

  // Game State
  const [todayStock, setTodayStock] = useState(null);
  const initialGameOver = localStorageManipulator.getGameOver();
  const [gameOver, setGameOver] = useState(initialGameOver);

  useEffect(() => {
    // Fetch the data and set todayStock
    const fetchTodayStock = async () => {
      const response = await axios.get("/api/stock/today");
      const todayTicker = response.data;
      const todayStockData = await axios.get(`/api/stock/${todayTicker}`);
      const todayStockDataItem = todayStockData.data[0];
      const stock = new Stock(todayTicker, todayStockDataItem);
      setTodayStock(stock);
    };

    fetchTodayStock();
  }, []);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          todayStock,
          shareResults,
          setShareResults,
        }}
      >
        <Header mode={mode} setPopup={setPopup} />
        <Alpha mode={mode} trigger={popup} setPopup={setPopup} />
        <Instructions mode={mode} trigger={popup} setPopup={setPopup} />
        <Statistics mode={mode} trigger={popup} setPopup={setPopup} />
        <Settings
          mode={mode}
          trigger={popup}
          setPopup={setPopup}
          toggleMode={toggleMode}
        />
        <Login mode={mode} trigger={popup} setPopup={setPopup} />
        <WinLoss mode={mode} trigger={popup} setPopup={setPopup} />
        <Graph popupState={popup} />
        <div className="game">
          <Board mode={mode} />
          <Search
            mode={mode}
            setPopup={setPopup}
            gameOver={gameOver}
            setGameOver={setGameOver}
          />
        </div>
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
