import React from "react";
import "../../css/Login.css";
import "../../css/Popup.css";
import { LocalStorageManipulator } from "../../features/board/LocalStorageManipulator";

function Settings({ mode, trigger, setPopup, toggleMode }) {
  const setMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    console.log(newMode);
    const localStorageManipulator = new LocalStorageManipulator();
    localStorageManipulator.setMode(newMode);
    toggleMode();
  };

  if (trigger === "settings") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode} settings-container`}>
          <h1>Settings</h1>
          <hr />
          <br />
          <button
            className={`fancy-button-${mode}`}
            onClick={() => setPopup("alpha")}
          >
            Report a bug
          </button>
          <br />
          <br />
          <hr />
          <br />
          {mode === "light" ? (
            <>
              <button className={`fancy-button-${mode}`} onClick={setMode}>
                Toggle Dark Mode
              </button>
            </>
          ) : (
            <>
              <button className={`fancy-button-${mode}`} onClick={setMode}>
                Toggle Light Mode
              </button>
            </>
          )}
          <br />
          <br />
          <hr />
          <br />
          <a href="https://github.com/lesterholsterr/stockle" target="_blank">
            <button className={`fancy-button-${mode}`}>View Git Repo</button>
          </a>

          <br />
          <br />
          <hr />
          <br />
          <p>Version: Alpha 1.0.1</p>

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

export default Settings;
