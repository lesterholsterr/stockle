import React from "react";
import "../../css/Popup.css";

function Settings({ trigger, setPopup, toggleMode }) {
  if (trigger === "settings") {
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
  } else {
    return "";
  }
}

export default Settings;
