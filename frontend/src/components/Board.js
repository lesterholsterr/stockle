import React from "react";
import Metric from "./Metric";

// A board consists of 6 attempts (rows) and 6 metrics (columns)
const Board = ({ mode }) => {
  return (
    <div className={`board`}>
      {" "}
      <div className="row">
        <h3>Ticker</h3>
        <h3>Sector</h3>
        <h3>Share Price</h3>
        <h3>Market Cap</h3>
        <h3>Revenue (LTM)</h3>
        <h3>P/E Ratio (LTM)</h3>
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={0} mode={mode} />
        <Metric metricPos={1} attemptVal={0} mode={mode} />
        <Metric metricPos={2} attemptVal={0} mode={mode} />
        <Metric metricPos={3} attemptVal={0} mode={mode} />
        <Metric metricPos={4} attemptVal={0} mode={mode} />
        <Metric metricPos={5} attemptVal={0} mode={mode} />
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={1} mode={mode} />
        <Metric metricPos={1} attemptVal={1} mode={mode} />
        <Metric metricPos={2} attemptVal={1} mode={mode} />
        <Metric metricPos={3} attemptVal={1} mode={mode} />
        <Metric metricPos={4} attemptVal={1} mode={mode} />
        <Metric metricPos={5} attemptVal={1} mode={mode} />
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={2} mode={mode} />
        <Metric metricPos={1} attemptVal={2} mode={mode} />
        <Metric metricPos={2} attemptVal={2} mode={mode} />
        <Metric metricPos={3} attemptVal={2} mode={mode} />
        <Metric metricPos={4} attemptVal={2} mode={mode} />
        <Metric metricPos={5} attemptVal={2} mode={mode} />
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={3} mode={mode} />
        <Metric metricPos={1} attemptVal={3} mode={mode} />
        <Metric metricPos={2} attemptVal={3} mode={mode} />
        <Metric metricPos={3} attemptVal={3} mode={mode} />
        <Metric metricPos={4} attemptVal={3} mode={mode} />
        <Metric metricPos={5} attemptVal={3} mode={mode} />
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={4} mode={mode} />
        <Metric metricPos={1} attemptVal={4} mode={mode} />
        <Metric metricPos={2} attemptVal={4} mode={mode} />
        <Metric metricPos={3} attemptVal={4} mode={mode} />
        <Metric metricPos={4} attemptVal={4} mode={mode} />
        <Metric metricPos={5} attemptVal={4} mode={mode} />
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={5} mode={mode} />
        <Metric metricPos={1} attemptVal={5} mode={mode} />
        <Metric metricPos={2} attemptVal={5} mode={mode} />
        <Metric metricPos={3} attemptVal={5} mode={mode} />
        <Metric metricPos={4} attemptVal={5} mode={mode} />
        <Metric metricPos={5} attemptVal={5} mode={mode} />
      </div>
    </div>
  );
};

export default Board;
