// src/components/SatisfactionIndicator.tsx

import React from "react";

interface SatisfactionIndicatorProps {
  value: number; // 0 – 100
}

const getColor = (value: number): string => {
  if (value >= 70) return "#2ecc71"; // green
  if (value >= 40) return "#f39c12"; // orange
  return "#e74c3c";                  // red
};

const getLabel = (value: number): string => {
  if (value >= 70) return "Мешканці задоволені 😊";
  if (value >= 40) return "Мешканці невдоволені 😐";
  return "Мешканці незадоволені 😠";
};

const SatisfactionIndicator: React.FC<SatisfactionIndicatorProps> = ({
  value,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const color = getColor(clamped);

  return (
    <div className="satisfaction-indicator">
      <h3>😊 Задоволеність мешканців: {clamped}%</h3>

      <div className="satisfaction-bar-bg">
        <div
          className="satisfaction-bar-fill"
          style={{
            width: `${clamped}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <p className="satisfaction-label">{getLabel(clamped)}</p>
    </div>
  );
};

export default SatisfactionIndicator;
