import React, { Component } from "react";
import CanvasJSReact from "../../libraries/canvasJS/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GuessDistribution extends Component {
  render() {
    const { distribution } = this.props;

    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Guess Distribution",
      },
      axisX: {
        reversed: true,
      },
      data: [
        {
          type: "bar",
          dataPoints: [
            { y: distribution[1], label: "1" },
            { y: distribution[2], label: "2" },
            { y: distribution[3], label: "3" },
            { y: distribution[4], label: "4" },
            { y: distribution[5], label: "5" },
            { y: distribution[6], label: "6" },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
    );
  }
}
export default GuessDistribution;
