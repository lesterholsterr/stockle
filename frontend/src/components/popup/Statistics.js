import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import GuessDistribution from "./GuessDistribution";
import "../../css/Popup.css";
import "../../css/Login.css";

function Statistics({ mode, trigger, setPopup }) {
  const { user } = useSelector((state) => state.auth);
  const [weeklyLeaders, setWeeklyLeaders] = useState([]);
  const [allTimeLeaders, setAllTimeLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const weeklyLeaders = await axios.get("/api/users/leaderboard/week");
      const allTimeLeaders = await axios.get("/api/users/leaderboard/all");
      setWeeklyLeaders(weeklyLeaders.data);
      setAllTimeLeaders(allTimeLeaders.data);
    };
    fetchLeaders();
  }, [trigger]);

  if (trigger === "statistics") {
    return (
      <div className={"popup"}>
        <div className={`popup-inner ${mode} statistics-container`}>
          <div className="button-row">
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("statistics")}
            >
              <b>Statistics</b>
            </button>
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-week")}
            >
              Leaderboard
            </button>
          </div>
          {user ? (
            <>
              <h1>Statistics - {user.username}</h1>
              <div className="statistics-row">
                <div className="statistic-box">
                  <h6>Games Played</h6>
                  <p>{user.gamesPlayed}</p>
                </div>
                <div className="statistic-box">
                  <h6>Win Rate</h6>
                  <p>{Math.round((user.gamesWon / user.gamesPlayed) * 100)}%</p>
                </div>
                <div className="statistic-box">
                  <h6>Points This Week</h6>
                  <p>{user.weeklyPoints}</p>
                </div>
                <div className="statistic-box">
                  <h6>Points All Time</h6>
                  <p>{user.totalPoints}</p>
                </div>
                <div className="statistic-box">
                  <h6>Current Streak</h6>
                  <p>{user.currentStreak}</p>
                </div>
                <div className="statistic-box">
                  <h6>All Time Streak</h6>
                  <p>{user.maxStreak}</p>
                </div>
              </div>
              <br />
              <GuessDistribution distribution={user.guessDistribution} mode={mode} />
            </>
          ) : (
            <>
              <h1>Statistics</h1>
              <button
                className="underline-btn"
                onClick={() => setPopup("login")}
              >
                Log in to track statistics
              </button>
            </>
          )}
          <div
            className={`close-popup-${mode}`}
            onClick={() => setPopup("none")}
          >
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "leaderboard-week") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode} statistics-container`}>
          <div className="button-row">
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("statistics")}
            >
              Statistics
            </button>
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-week")}
            >
              <b>Leaderboard</b>
            </button>
          </div>
          <div className="button-row">
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-week")}
            >
              <b>This Week</b>
            </button>
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-all")}
            >
              All Time
            </button>
          </div>
          <h1>Weekly Leaderboard</h1>

          {weeklyLeaders.map((user) => (
            <div key={user._id} className="leader-row">
              <div className={`leader-name-${mode}`}>{`${user.username}`}</div>
              <div
                className={`leader-points-${mode}`}
              >{`${user.weeklyPoints}`}</div>
            </div>
          ))}
          <div
            className={`close-popup-${mode}`}
            onClick={() => setPopup("none")}
          >
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "leaderboard-all") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode} statistics-container`}>
          <div className="button-row">
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("statistics")}
            >
              Statistics
            </button>
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-all")}
            >
              <b>Leaderboard</b>
            </button>
          </div>
          <div className="button-row">
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-week")}
            >
              This Week
            </button>
            <button
              className={`menu-button-${mode}`}
              onClick={() => setPopup("leaderboard-all")}
            >
              <b>All Time</b>
            </button>
          </div>
          <h1>All Time Leaderboard</h1>
          {allTimeLeaders.map((user) => (
            <div key={user._id} className="leader-row">
              <div className={`leader-name-${mode}`}>{`${user.username}`}</div>
              <div
                className={`leader-points-${mode}`}
              >{`${user.totalPoints}`}</div>
            </div>
          ))}
          <div
            className={`close-popup-${mode}`}
            onClick={() => setPopup("none")}
          >
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
