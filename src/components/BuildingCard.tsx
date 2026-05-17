// src/components/BuildingCard.tsx

import React from "react";
import type { Building } from "../types";

interface BuildingCardProps {
  building: Building;
  onUpgrade: (id: number) => void;
  cityResources: number;
}

const UPGRADE_COST = 200;

const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  onUpgrade,
  cityResources,
}) => {
  const canAfford = cityResources >= UPGRADE_COST;

  // Apply level2 class when level > 1 (mirrors original JS logic)
  const cellClass = [
    "cell",
    building.cssClass,
    building.level > 1 ? "level2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cellClass}
      data-level={building.level}
      onClick={() => {
        if (canAfford) {
          onUpgrade(building.id);
        } else {
          alert("Недостатньо ресурсів");
        }
      }}
      title={canAfford ? "Натисніть для покращення" : "Недостатньо ресурсів"}
    >
      {building.name} {building.level > 1 ? `${building.level} рівня` : ""}
    </div>
  );
};

export default BuildingCard;
