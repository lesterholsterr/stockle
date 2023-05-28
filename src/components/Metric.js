import React, { useContext } from "react";
import { AppContext } from "../App";

function Metric({ metricPos, attemptVal }) {
  const { board } = useContext(AppContext);
  const metric = board[attemptVal][metricPos];
  return <div className="metric"> {metric} </div>;
}

export default Metric;
