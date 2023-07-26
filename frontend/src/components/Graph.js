import React, { Component } from "react";
import CanvasJSReact from "../libraries/canvasJS/canvasjs.react";
import axios from "axios";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: props.popupState,
      dataPoints: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get("/api/history");
      const data = response.data;
      const curPrice = data[data.length - 1].close;
      console.log(curPrice);
      var dps = [];
      for (var i = 0; i < data.length; i++) {
        const price = Number(data[i].close);
        const standardisedPrice = ((price / curPrice) * 100).toFixed(2);
        console.log(standardisedPrice);
        dps.push({
          x: new Date(data[i].date),
          y: Number(standardisedPrice),
        });
      }
      this.setState({
        isLoaded: true,
        dataPoints: dps,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    const { popupState } = this.props;

    const options = {
      theme: "light2", // "light1", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      data: [
        {
          type: "area",
          dataPoints: this.state.dataPoints,
        },
      ],
      title: {
        text: "Relative Share Price Since Inception",
      },
      axisY: {
        // gridThickness: 0,
        // tickLength: 0,
        // ^these remove the horizontal grid lines
        labelFormatter: function () {
          return " ";
        },
      },
    };

    const containerProps = {
      width: "100%",
      height: "320px",
      margin: "auto",
    };

    return (
      <div className="graph">
        {this.state.isLoaded && popupState === "none" && (
          <CanvasJSChart
            containerProps={containerProps}
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        )}
      </div>
    );
  }
}

export default Graph;
