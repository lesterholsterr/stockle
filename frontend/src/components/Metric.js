import React, { useContext } from "react";
import { AppContext } from "../App";

function Metric({ metricPos, attemptVal, mode }) {
  const { board } = useContext(AppContext);
  const metric = board[attemptVal][metricPos];
  if (metricPos === 1) {
    return <div className={`metric-sector ${mode}`}> {metric} </div>;
  } else {
    return <div className={`metric ${mode}`}> {metric} </div>;
  }
}

export default Metric;
