import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const GuessDistribution = ({ distribution, mode }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const isDarkMode = mode === "dark";

    const textColor = isDarkMode
      ? "rgba(255, 255, 255, 0.87)"
      : "rgba(0, 0, 0, 0.87)";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const barColor = isDarkMode ? "#60a5fa" : "#2563eb";

    const labels = ["1", "2", "3", "4", "5", "6"];
    const data = labels.map((label) => distribution[parseInt(label)]);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: barColor,
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: "y", // Horizontal bars
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Guess Distribution",
            color: textColor,
            font: {
              size: 16,
              weight: "bold",
            },
            padding: {
              bottom: 20,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: gridColor,
              drawBorder: false,
            },
            ticks: {
              color: textColor,
              font: {
                size: 12,
              },
              stepSize: 1, // Force whole number steps
              precision: 0, // Remove decimal places
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [distribution, mode]); // Recreate chart when distribution or mode changes

  return (
    <div style={{ height: "300px", width: "100%", padding: "1rem" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GuessDistribution;
