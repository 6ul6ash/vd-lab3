// src/components/BudgetPanel.tsx

import React from "react";

interface BudgetPanelProps {
  budget: number;
  materials: number;
  workers: number;
}

const BudgetPanel: React.FC<BudgetPanelProps> = ({
  budget,
  materials,
  workers,
}) => {
  return (
    <div className="budget-panel">
      <h3>💰 Бюджет міста</h3>

      <div className="budget-row">
        <span>Бюджет:</span>
        <span>{budget} грн</span>
      </div>

      <div className="budget-row">
        <span>Будівельні матеріали:</span>
        <span>{materials} од.</span>
      </div>

      <div className="budget-row">
        <span>Кількість будівельників:</span>
        <span>{workers} осіб</span>
      </div>
    </div>
  );
};

export default BudgetPanel;
