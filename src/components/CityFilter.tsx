// src/components/CityFilter.tsx

import React from "react";
import type { BuildingCategory } from "../types";

type FilterValue = "all" | BuildingCategory;

interface CityFilterProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

const filters: { label: string; value: FilterValue }[] = [
  { label: "Усі",         value: "all"         },
  { label: "Житлові",     value: "residential" },
  { label: "Комерційні",  value: "commercial"  },
  { label: "Промислові",  value: "industrial"  },
];

const CityFilter: React.FC<CityFilterProps> = ({ active, onChange }) => {
  return (
    <div className="filter-buttons">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${active === f.value ? "active" : ""}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default CityFilter;
