import React from "react";
import Metric from "../Metric";
import "../../css/Popup.css";

function Instructions({ mode, trigger, setPopup }) {
  if (trigger === "instructions") {
    return (
      <div className="popup">
        <div className={`popup-inner ${mode} instruction-container`}>
          <h1>How To Play</h1>
          <h4>Guess the Stock in 6 tries.</h4>
          <p>Stockle, as its name suggests, is inspired by Wordle.</p>
          <ul>
            <li>
              Each guess must be a valid stock listed on an American exchange.
            </li>
            <li>
              The metrics of the guessed stock will show whether you are higher
              or lower compared to the correct stock.
            </li>
            <li>
              A <em>relative</em> share price chart is provided. To hide the
              stock's true price, we assume its current price is $100 and
              project historical performance based on this assumption.
            </li>
            <li>Click and drag the chart to zoom.</li>
          </ul>
          <h3>Example</h3>
          <div className="instruction-row">
            <p>Ticker</p>
            <p>Sector</p>
            <p>Share Price</p>
            <p>Market Cap</p>
          </div>
          <div className="instruction-row">
            <div className={`metric ${mode}`}> AAPL </div>
            <div className={`metric ${mode}`}> Technology ❌ </div>
            <div className={`metric ${mode}`}> $193.73 ↗️ </div>
            <div className={`metric ${mode}`}> 3.04T ⬇️ </div>
          </div>
          <ul>
            <li>The stock you just guessed is Apple ($AAPL)</li>
            <li>The correct stock is not in the technology sector</li>
            <li>
              The correct stock's share price is <em>slightly*</em> higher than
              $193.73
            </li>
            <li>
              The correct stock's market cap is much lower than 3.04 trillion
              USD
            </li>
          </ul>
          <p>*Slightly = within 30% of the true value.</p>
          <br />
          <br />
          <button className="underline-btn" onClick={() => setPopup("register")}>
            <b>Don't forget to create an account!</b>
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

export default Instructions;
