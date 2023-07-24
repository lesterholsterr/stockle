import React, { useContext } from "react";
import { AppContext } from "../../App";
import { toast } from "react-toastify";

import "../../css/Popup.css";

function WinLoss({ trigger, setPopup }) {
  const { currAttempt, todayStock, shareResults } = useContext(AppContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareResults).then(() => {
      toast.success("Copied to clipboard!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  if (trigger === "win") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>You Win!</h3>
          <br />
          <p>Today's Stock: {todayStock.name}</p>
          <p>Guesses Used: {currAttempt - 1}</p>
          <br />
          <p>{todayStock.summary}</p>
          <button onClick={copyToClipboard}>Share Results</button>
          <div className="close-popup" onClick={() => setPopup("none")}>
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
          <h3>You Lose!</h3>
          <br />
          <p>Today's Stock: {todayStock.name}</p>
          <br />
          <p>{todayStock.summary}</p>
          <button onClick={copyToClipboard}>Share Results</button>
          <div className="close-popup" onClick={() => setPopup("none")}>
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
