import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";

import { LocalStorageManipulator } from "../features/board/LocalStorageManipulator";
import "../css/Hints.css";

const Hints = ({ mode, gameOver }) => {
  const { todayStock } = useContext(AppContext);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [revealedHints, setRevealedHints] = useState({});
  const [availableMetrics, setAvailableMetrics] = useState([]);
  const localStorageManipulator = new LocalStorageManipulator();

  const allMetrics = [
    { label: "Industry", value: "industry" },
    { label: "Free Cash Flow", value: "freeCashflow" },
    { label: "EV/Revenue", value: "enterpriseToRevenue" },
    { label: "EV/EBITDA", value: "enterpriseToEbitda" },
    { label: "Gross Margin", value: "grossMargins" },
    { label: "EBITDA Margin", value: "ebitdaMargins" },
    { label: "Profit Margin", value: "profitMargins" },
    { label: "Price to Book", value: "priceToBook" },
    { label: "Debt to Equity", value: "debtToEquity" },
    { label: "Return on Assets", value: "returnOnAssets" },
    { label: "Return on Equity", value: "returnOnEquity" },
    { label: "Full Time Employees", value: "fullTimeEmployees" },
    { label: "Dividend per Share", value: "lastDividendValue" },
    { label: "Short % of Float", value: "shortRatio" },
    { label: "Beta", value: "beta" },
  ];

  useEffect(() => {
    const savedHints = localStorageManipulator.getHints();
    setHintsUsed(savedHints.hintsUsed);
    setRevealedHints(savedHints.revealedHints);
  }, []);

  useEffect(() => {
    if (todayStock) {
      const filteredMetrics = allMetrics.filter(
        (metric) =>
          todayStock[metric.value] !== null &&
          todayStock[metric.value] !== undefined
      );
      setAvailableMetrics(filteredMetrics);
    }
  }, [todayStock]);

  const handleConfirm = () => {
    if (!selectedMetric || hintsUsed >= 3) return;

    const newRevealedHints = {
      ...revealedHints,
      [selectedMetric]: todayStock[selectedMetric],
    };
    const newHintsUsed = hintsUsed + 1;

    setRevealedHints(newRevealedHints);
    setHintsUsed(newHintsUsed);
    setSelectedMetric("");

    localStorageManipulator.setHints({
      hintsUsed: newHintsUsed,
      revealedHints: newRevealedHints,
    });
  };

  return (
    <div className={`hints-container ${mode}`}>
      <h3 className="hints-title">Hints ({3 - hintsUsed} remaining)</h3>

      {hintsUsed < 3 && (
        <div className="hint-row">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className={`hint-dropdown ${mode}`}
          >
            <option value="">Select metric...</option>
            {availableMetrics.map((metric) => (
              <option
                key={metric.value}
                value={metric.value}
                disabled={revealedHints[metric.value]}
              >
                {metric.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleConfirm}
            disabled={gameOver}
            className={`fancy-button-${mode}`}
          >
            Use Hint
          </button>
        </div>
      )}

      {Object.entries(revealedHints).map(([metric, value], index) => (
        <div key={metric} className="revealed-hint">
          <span className="hint-label">
            {availableMetrics.find((m) => m.value === metric)?.label}:
          </span>
          <span className="hint-value">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default Hints;
