import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../css/Popup.css";
import "../../css/Login.css";

function Statistics({ mode, trigger, setPopup }) {
  const { user } = useSelector((state) => state.auth);

  if (trigger === "statistics") {
    return (
      <div className={"popup"}>
        <div className={`popup-inner ${mode}`}>
          <div className="button-row">
            <button
              className="menu-button"
              onClick={() => setPopup("statistics")}
            >
              Statistics
            </button>
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-week")}
            >
              Leaderboard
            </button>
          </div>
          {user ? (
            <>
              <h3>Statistics - {user.username}</h3>
              <p>Games Played: {user.gamesPlayed}</p>
              <p>Win %: {(user.gamesWon / user.gamesPlayed) * 100}%</p>
              <p>Current Streak: {user.currentStreak}</p>
              <p>All Time Streak: {user.maxStreak}</p>
              <br />
              <ol>
                Guess Distribution
                <li>{user.guessDistribution[1]}</li>
                <li>{user.guessDistribution[2]}</li>
                <li>{user.guessDistribution[3]}</li>
                <li>{user.guessDistribution[4]}</li>
                <li>{user.guessDistribution[5]}</li>
                <li>{user.guessDistribution[6]}</li>
              </ol>
            </>
          ) : (
            <>
              <h3>Statistics</h3>
              <button
                className="change-option-btn"
                onClick={() => setPopup("login")}
              >
                Login to track statistics
              </button>
            </>
          )}
          <div className={`close-popup-${mode}`} onClick={() => setPopup("none")}>
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "leaderboard-week") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <div className="button-row">
            <button
              className="menu-button"
              onClick={() => setPopup("statistics")}
            >
              Statistics
            </button>
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-week")}
            >
              Leaderboard
            </button>
          </div>
          <h3>Weekly Leaderboard</h3>
          <div className="button-row">
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-week")}
            >
              This Week
            </button>
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-all")}
            >
              All Time
            </button>
          </div>
          <div className={`close-popup-${mode}`} onClick={() => setPopup("none")}>
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "leaderboard-all") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <div className="button-row">
            <button
              className="menu-button"
              onClick={() => setPopup("statistics")}
            >
              Statistics
            </button>
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-week")}
            >
              Leaderboard
            </button>
          </div>
          <h3>All Time Leaderboard</h3>
          <div className="button-row">
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-week")}
            >
              This Week
            </button>
            <button
              className="menu-button"
              onClick={() => setPopup("leaderboard-all")}
            >
              All Time
            </button>
          </div>
          <div className={`close-popup-${mode}`} onClick={() => setPopup("none")}>
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default Statistics;
