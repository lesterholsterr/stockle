import React, { useContext } from "react";
import { AppContext } from "../App";

function Metric({ metricPos, attemptVal, mode }) {
  const { board } = useContext(AppContext);
  const metric = board[attemptVal][metricPos];
  return <div className={`metric ${mode}`}> {metric} </div>;
}

export default Metric;
