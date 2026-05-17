// src/pages/BudgetPage.tsx

import React, { useState } from "react";
import BudgetPanel from "../components/BudgetPanel";

const BudgetPage: React.FC = () => {
  const [budget, setBudget] = useState<number>(50000);
  const [materials, setMaterials] = useState<number>(300);
  const [workers, setWorkers] = useState<number>(45);

  return (
    <>
      {/* ── Section: Будівництво ── */}
      <section id="build">
        <h2>Будівництво</h2>
        <p>Для будівництва потрібні ресурси та робітники.</p>

        <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
          <li>Будівельні матеріали</li>
          <li>Робітники</li>
          <li>Бюджет</li>
        </ul>
      </section>

      {/* ── Section: Ресурси міста ── */}
      <section id="resources">
        <h2>Ресурси міста</h2>
        <p>Контроль бюджету та матеріалів.</p>

        {/* BudgetPanel component (Завдання 1) */}
        <BudgetPanel
          budget={budget}
          materials={materials}
          workers={workers}
        />

        {/* Controls to simulate spending */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              if (budget >= 5000) {
                setBudget((b) => b - 5000);
                setMaterials((m) => m + 50);
              } else {
                alert("Недостатньо бюджету");
              }
            }}
          >
            Купити матеріали (-5000 грн)
          </button>

          <button
            onClick={() => {
              if (budget >= 10000) {
                setBudget((b) => b - 10000);
                setWorkers((w) => w + 10);
              } else {
                alert("Недостатньо бюджету");
              }
            }}
          >
            Найняти робітників (-10000 грн)
          </button>

          <button
            onClick={() => {
              setBudget((b) => b + 20000);
            }}
          >
            Отримати субсидію (+20000 грн)
          </button>
        </div>
      </section>
    </>
  );
};

export default BudgetPage;
