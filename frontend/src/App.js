import { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

export const AppContext = createContext();

function App() {
  // Popup window status
  const [popup, setPopup] = useState("none");

  // Dark/light mode status
  const [mode, setMode] = useState("light");
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
  const [todayStock, setTodayStock] = useState(null);

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
        <Instructions trigger={popup} setPopup={setPopup} />
        <Statistics trigger={popup} setPopup={setPopup} />
        <Settings trigger={popup} setPopup={setPopup} toggleMode={toggleMode} />
        <Login trigger={popup} setPopup={setPopup} />
        <WinLoss trigger={popup} setPopup={setPopup} />
        <Graph />
        <div className="game">
          <Board />
          <Search setPopup={setPopup} />
        </div>
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
