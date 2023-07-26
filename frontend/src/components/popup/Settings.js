import React from "react";
import "../../css/Login.css";
import "../../css/Popup.css";

function Settings({ mode, trigger, setPopup, toggleMode }) {
  if (trigger === "settings") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <h3>Settings</h3>
          <button className={`fancy-button-${mode}`} onClick={toggleMode}>Switch Mode</button>
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

export default Settings;
