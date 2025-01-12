import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import "../css/Graph.css";

// TOO LAZY TO LEARN GRAPH LIBRARY
// CLAUDE WROTE THIS ENTIRE COMPONENT FOR ME
const Graph = ({ popupState, mode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeframe, setTimeframe] = useState("1Y");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/history");
        setData(
          response.data.map((item) => ({
            date: new Date(item.date),
            close: Number(item.close),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data.length || popupState !== "none") return;

    // Filter data based on timeframe
    const getFilterDate = () => {
      const now = new Date();
      switch (timeframe) {
        case "1M":
          return new Date(now.setMonth(now.getMonth() - 1));
        case "1Y":
          return new Date(now.setFullYear(now.getFullYear() - 1));
        case "5Y":
          return new Date(now.setFullYear(now.getFullYear() - 5));
        default:
          return new Date(0); // Beginning of time for 'All'
      }
    };

    const filterDate = getFilterDate();
    const filteredData = data.filter((item) => item.date >= filterDate);

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const isDarkMode = mode === "dark";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const axisColor = isDarkMode
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.3)";
    const textColor = isDarkMode
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(0, 0, 0, 0.6)";

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: filteredData.map((item) => item.date.toLocaleDateString()),
        datasets: [
          {
            data: filteredData.map((item) => item.close),
            borderColor: isDarkMode ? "#60a5fa" : "#2563eb", // Lighter blue for dark mode
            borderWidth: 2,
            fill: true,
            backgroundColor: isDarkMode
              ? "rgba(96, 165, 250, 0.1)"
              : "rgba(37, 99, 235, 0.1)",
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
          tooltip: {
            enabled: false, // Disable tooltips
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: gridColor,
            },
            border: {
              display: true,
              color: axisColor,
            },
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6,
              color: textColor,
              font: {
                size: 11,
              },
            },
          },
          y: {
            display: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            border: {
              display: true,
              color: "rgba(0, 0, 0, 0.3)",
            },
            ticks: {
              display: false, // Hide y-axis labels but keep the axis
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, timeframe, popupState]); // Re-run when these dependencies change

  const timeframeButtons = ["1M", "1Y", "5Y", "All"];

  return (
    <div className="graph-container">
      <div className="timeframe-buttons">
        {timeframeButtons.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`timeframe-button ${timeframe === tf ? "active" : ""}`}
          >
            {tf}
          </button>
        ))}
      </div>
      <div className="chart-container">
        <canvas ref={chartRef} height="320"></canvas>
      </div>
    </div>
  );
};

export default Graph;
