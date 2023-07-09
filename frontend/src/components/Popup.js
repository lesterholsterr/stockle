import "../css/Popup.css";
import React, { useContext } from "react";
import { AppContext } from "../App";
import { toast } from "react-toastify";

function Popup({ toggleMode, trigger, setPopup }) {
  const { currAttempt, todayStock, shareResults } = useContext(AppContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareResults).then(() => {
      toast.success("Copied to clipboard!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(shareResults);
    });
  };

  if (trigger === "instructions") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Instructions</h3>
          <p>Figure it out yourself</p>
          <div className="close-popup" onClick={() => setPopup("none")}>
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "statistics") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Statistics</h3>
          <p>Coming Soon</p>
          <div className="close-popup" onClick={() => setPopup("none")}>
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "settings") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Settings</h3>
          <button onClick={toggleMode}>Switch Mode</button>
          <div className="close-popup" onClick={() => setPopup("none")}>
            <div className="close-line-1"></div>
            <div className="close-line-2"></div>
          </div>
        </div>
      </div>
    );
  } else if (trigger === "win") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>You Win!</h3>
          <br />
          <p>Today's Stock: {todayStock.name}</p>
          <p>Guesses Used: {currAttempt}</p>
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

export default Popup;
