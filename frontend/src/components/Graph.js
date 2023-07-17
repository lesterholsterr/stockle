// https://canvasjs.com/react-stockcharts/stockchart-date-time-axis-react/

import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints1: [],
      dataPoints2: [],
      isLoaded: false,
    };

    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, "0");
    var mm = String(this.today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = this.today.getFullYear();
    this.today = mm + "/" + dd + "/" + yyyy;
  }

  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state


    fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
      .then((res) => res.json())
      .then((data) => {
        var dps1 = [],
          dps2 = [];
        for (var i = 0; i < data.length; i++) {
          dps1.push({
            x: new Date(data[i].date),
            y: [
              Number(data[i].open),
              Number(data[i].high),
              Number(data[i].low),
              Number(data[i].close),
            ],
          });
          dps2.push({
            x: new Date(data[i].date),
            y: Number(data[i].volume_usd),
          });
        }
        this.setState({
          isLoaded: true,
          dataPoints1: dps1,
          dataPoints2: dps2,
        });
      });
  }

  render() {
    const options = {
      theme: "light2",
      charts: [
        {
          axisX: {
            lineThickness: 5,
            tickLength: 0,
            labelFormatter: function (e) {
              return "";
            },
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              labelFormatter: function (e) {
                return "";
              },
            },
          },
          toolTip: {
            shared: true,
          },
          data: [
            {
              name: "Price (in USD)",
              yValueFormatString: "$#,###.##",
              type: "candlestick",
              dataPoints: this.state.dataPoints1,
            },
          ],
        },
      ],
      navigator: {
        data: [
          {
            dataPoints: this.state.dataPoints2,
          },
        ],
        slider: {
          minimum: new Date("2019-01-01"),
          maximum: new Date(this.today),
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
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && (
              <CanvasJSStockChart
                containerProps={containerProps}
                options={options}
                /* onRef = {ref => this.chart = ref} */
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default Graph;
