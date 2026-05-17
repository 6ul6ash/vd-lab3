// src/pages/ResourcesPage.tsx

import { useState } from "react";
import BudgetPanel from "../components/BudgetPanel";

const ResourcesPage = () => {
  const [budget, setBudget]       = useState<number>(50000);
  const [materials, setMaterials] = useState<number>(300);
  const [workers, setWorkers]     = useState<number>(45);

  return (
    <section id="resources">
      <h2>Ресурси міста</h2>
      <p>Контроль бюджету та матеріалів.</p>

      <BudgetPanel
        budget={budget}
        materials={materials}
        workers={workers}
      />

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

        <button onClick={() => setBudget((b) => b + 20000)}>
          Отримати субсидію (+20000 грн)
        </button>
      </div>
    </section>
  );
};

export default ResourcesPage;
