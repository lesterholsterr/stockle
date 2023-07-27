import React, { useContext } from "react";
import { AppContext } from "../../App";
import { toast } from "react-toastify";

import "../../css/Popup.css";

function WinLoss({ mode, trigger, setPopup }) {
  const { currAttempt, todayStock, shareResults } = useContext(AppContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareResults).then(() => {
      toast.success("Copied to clipboard!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (trigger === "win") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <h1>You Win!</h1>
          <br />
          <h3>Today's Stock: {todayStock.name}</h3>
          <p>Guesses Used: {currAttempt - 1}</p>
          <p>Points Earned: {800 - currAttempt * 100}</p>
          <p>Daily Reward: {Math.min(100, user.currentStreak * 20)}</p>
          <br />
          <p>{todayStock.summary}</p>
          <br />
          <button onClick={copyToClipboard} className={`fancy-button-${mode}`}>
            Share Results
          </button>
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
  } else if (trigger === "lose") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Out of Guesses!</h3>
          <br />
          <h3>Today's Stock: {todayStock.name}</h3>
          <p>Guesses Used: {currAttempt - 1}</p>
          <p>Points Earned: {100}</p>
          <p>Daily Reward: {Math.min(100, user.currentStreak * 20)}</p>
          <br />
          <p>{todayStock.summary}</p>
          <br />
          <button onClick={copyToClipboard} className={`fancy-button-${mode}`}>
            Share Results
          </button>
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

export default WinLoss;
