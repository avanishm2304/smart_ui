// src/PieChart.js

import React, { useMemo } from 'react';
import './Modal.css'; // It shares styles with the modal

// A map of friendly colors for our charts
const CHART_COLORS = [
  '#4f46e5', '#10b981', '#ef4444', '#f97316', '#3b82f6',
  '#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6', '#6366f1'
];

function PieChart({ title, data }) {
  // Memoize chart calculations
  const { gradient, legendData, total } = useMemo(() => {
    const labels = Object.keys(data);
    if (labels.length === 0) {
      return { gradient: '#f3f4f6', legendData: [], total: 0 };
    }

    const totalValue = labels.reduce((sum, label) => sum + data[label], 0);
    const legend = [];
    let gradientSegments = [];
    let cumulativePercent = 0;

    labels.forEach((label, index) => {
      const value = data[label];
      const percent = (value / totalValue) * 100;
      const color = CHART_COLORS[index % CHART_COLORS.length]; // Cycle through colors

      // For the CSS conic-gradient
      gradientSegments.push(`${color} ${cumulativePercent}% ${cumulativePercent + percent}%`);
      // For the legend display
      legend.push({ label, value, percent, color });

      cumulativePercent += percent;
    });

    return {
      gradient: `conic-gradient(${gradientSegments.join(', ')})`,
      legendData: legend,
      total: totalValue,
    };
  }, [data]);

  if (total === 0) {
    return (
      <div className="chart-wrapper">
        <h4 className="chart-title">{title}</h4>
        <div className="chart-no-data">No data available</div>
      </div>
    );
  }

  return (
    <div className="chart-wrapper">
      <h4 className="chart-title">{title}</h4>
      <div className="chart-container">
        <div className="pie-chart" style={{ background: gradient }} />
        <ul className="chart-legend">
          {legendData.map(({ label, value, percent, color }) => (
            <li key={label}>
              <span className="legend-color-box" style={{ backgroundColor: color }} />
              <span className="legend-label">{label}</span>
              <span className="legend-percent">{percent.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PieChart;