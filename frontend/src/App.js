import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "./components/Popup";
import Login from "./components/Login";
import Header from "./components/Header";
import Graph from "./components/Graph";
import Board from "./components/Board";
import Search from "./components/Search";
import { Stock } from "./Stock.js";
import { boardDefault } from "./BoardState";

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

  // Today's stock
  const todayStock = new Stock("Meta Platforms Inc");

  // Board State
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState(0);
  const [shareResults, setShareResults] = useState("");

  // My god this is so ugly
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
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
            <Popup
              toggleMode={toggleMode}
              trigger={popup}
              setPopup={setPopup}
            />
            <Login
              toggleMode={toggleMode}
              trigger={popup}
              setPopup={setPopup}
            />
            <Graph />
            <div className="game">
              <Board />
              <Search setPopup={setPopup} />
            </div>
            <ToastContainer />
          </AppContext.Provider>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
