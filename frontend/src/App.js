import { useCallback } from "react";
import { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getUserData } from "./features/auth/authSlice";

export const AppContext = createContext();

function App() {
  const localStorageManipulator = new LocalStorageManipulator();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [token, dispatch]);

  // Popup window status
  const [popup, setPopup] = useState("alpha");

  // Dark/light mode status
  const initialMode = localStorageManipulator.getMode();
  const [mode, setMode] = useState(initialMode);
  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  // Board State
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState(0);
  const [shareResults, setShareResults] = useState("");

  // Game State
  const [todayStock, setTodayStock] = useState(null);
  const initialGameOver = localStorageManipulator.getGameOver();
  const [gameOver, setGameOver] = useState(initialGameOver);

  useEffect(() => {
    // Fetch data for today's stock
    const fetchTodayStock = async () => {
      const response = await axios.get("/api/stock/today");
      const todayTicker = response.data;
      const todayStockData = await axios.get(`/api/stock/${todayTicker}`);
      const stock = new Stock(todayTicker, todayStockData.data);
      setTodayStock(stock);
    };

    fetchTodayStock();
  }, []);

  return (
    <AppContext.Provider
      value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        todayStock,
      }}
    >
      <div className="App">
        <Header mode={mode} setPopup={setPopup} />
        <PopupComponents
          mode={mode}
          popup={popup}
          setPopup={setPopup}
          toggleMode={toggleMode}
          shareResults={shareResults}
        />
        <Graph popupState={popup} />
        <div className="game">
          <Board mode={mode} />
          <Search
            mode={mode}
            setPopup={setPopup}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setShareResults={setShareResults}
          />
        </div>
        <ToastContainer />
      </div>
    </AppContext.Provider>
  );
}

const PopupComponents = ({
  mode,
  popup,
  setPopup,
  toggleMode,
  shareResults,
}) => (
  <>
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
    <WinLoss
      mode={mode}
      trigger={popup}
      setPopup={setPopup}
      shareResults={shareResults}
    />
  </>
);

export default App;
