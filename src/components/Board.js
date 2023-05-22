import React from 'react'
import Metric from "./Metric"

const Board = () => {

  return (
    <div className="board">
      {" "}
      <div className="row">
        <h3>Ticker</h3>
        <h3>Sector</h3>
        <h3>Share Price</h3>
        <h3>Market Cap</h3>
        <h3>Revenue (LTM)</h3>
        <h3>Net Income (LTM)</h3>
      </div>
      <div className="row">
        <Metric metricPos={0} attemptVal={0} />
        <Metric metricPos={1} attemptVal={0} />
        <Metric metricPos={2} attemptVal={0} />
        <Metric metricPos={3} attemptVal={0} />
        <Metric metricPos={4} attemptVal={0} />
        <Metric metricPos={5} attemptVal={0} />
      </div>
      
      <div className="row">
        <Metric metricPos={0} attemptVal={1} />
        <Metric metricPos={1} attemptVal={1} />
        <Metric metricPos={2} attemptVal={1} />
        <Metric metricPos={3} attemptVal={1} />
        <Metric metricPos={4} attemptVal={1} />
        <Metric metricPos={5} attemptVal={1} />
      </div>

      <div className="row">
        <Metric metricPos={0} attemptVal={2} />
        <Metric metricPos={1} attemptVal={2} />
        <Metric metricPos={2} attemptVal={2} />
        <Metric metricPos={3} attemptVal={2} />
        <Metric metricPos={4} attemptVal={2} />
        <Metric metricPos={5} attemptVal={2} />
      </div>

      <div className="row">
        <Metric metricPos={0} attemptVal={3} />
        <Metric metricPos={1} attemptVal={3} />
        <Metric metricPos={2} attemptVal={3} />
        <Metric metricPos={3} attemptVal={3} />
        <Metric metricPos={4} attemptVal={3} />
        <Metric metricPos={5} attemptVal={3} />
      </div>

      <div className="row">
        <Metric metricPos={0} attemptVal={4} />
        <Metric metricPos={1} attemptVal={4} />
        <Metric metricPos={2} attemptVal={4} />
        <Metric metricPos={3} attemptVal={4} />
        <Metric metricPos={4} attemptVal={4} />
        <Metric metricPos={5} attemptVal={4} />
      </div>

      <div className="row">
        <Metric metricPos={0} attemptVal={5} />
        <Metric metricPos={1} attemptVal={5} />
        <Metric metricPos={2} attemptVal={5} />
        <Metric metricPos={3} attemptVal={5} />
        <Metric metricPos={4} attemptVal={5} />
        <Metric metricPos={5} attemptVal={5} />
      </div>
    </div>
  )
}

export default Board