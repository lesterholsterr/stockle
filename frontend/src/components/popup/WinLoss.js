import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../App";
import { toast } from "react-toastify";

import { LocalStorageManipulator } from "../../features/board/LocalStorageManipulator";
import "../../css/Popup.css";

function WinLoss({ mode, trigger, setPopup, shareResults }) {
  const { currAttempt, todayStock } = useContext(AppContext);
  const localStorageManipulator = new LocalStorageManipulator();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareResults).then(() => {
      toast.success("Copied to clipboard!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  const { user } = useSelector((state) => state.auth);

  if (trigger === "win") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <h1>You Win!</h1>
          <br />
          <p>Base Points: {1000}</p>
          <p>Guess Penalty: -100 * {currAttempt}</p>
          <p>
            Hint Penalty: -75 * {localStorageManipulator.getHints().hintsUsed}
          </p>
          <p>Daily Reward: {Math.min(100, user.currentStreak * 20)}</p>
          <hr />
          <p>
            Total:{" "}
            {1000 -
              100 * currAttempt -
              75 * localStorageManipulator.getHints().hintsUsed +
              Math.min(100, user.currentStreak * 20)}
          </p>
          <br />
          <h3>Today's Stock: {todayStock.shortName}</h3>
          <br />
          <p>{todayStock.longBusinessSummary}</p>
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
        <div className={`popup-inner ${mode}`}>
          <h3>Out of Guesses!</h3>
          <br />
          <h3>Today's Stock: {todayStock.shortName}</h3>
          <p>Guesses Used: {currAttempt}</p>
          <p>Points Earned: {100}</p>
          <p>Daily Reward: {Math.min(100, user.currentStreak * 20)}</p>
          <br />
          <p>{todayStock.longBusinessSummary}</p>
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
