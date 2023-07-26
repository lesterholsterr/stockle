import React from "react";
import "../../css/Popup.css";

function Instructions({ mode, trigger, setPopup }) {
  if (trigger === "instructions") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode}`}>
          <h3>Instructions</h3>
          <p>Figure it out yourself</p>
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

export default Instructions;
