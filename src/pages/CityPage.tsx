// src/pages/CityPage.tsx

import React, { useState } from "react";
import BuildingCard from "../components/BuildingCard";
import CityFilter from "../components/CityFilter";
import SatisfactionIndicator from "../components/SatisfactionIndicator";
import type { Building } from "../types";
import type { BuildingCategory } from "../types";

type FilterValue = "all" | BuildingCategory;

// ── Initial buildings (mirrors original HTML .city-grid) ──────────────────
const initialBuildings: Building[] = [
  {
    id: 1,
    name: "Будинок",
    category: "residential",
    cssClass: "building",
    level: 1,
  },
  {
    id: 2,
    name: "Дорога",
    category: "commercial",
    cssClass: "road",
    level: 1,
  },
  {
    id: 3,
    name: "Завод",
    category: "industrial",
    cssClass: "factory",
    level: 1,
  },
];

const UPGRADE_COST = 200;

// ── Comment type ──────────────────────────────────────────────────────────
interface Comment {
  id: number;
  username: string;
  text: string;
}

const CityPage: React.FC = () => {
  // ── State ────────────────────────────────────────────────────────────────
  const [cityResources, setCityResources] = useState<number>(1000);
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");

  // Satisfaction = based on average building level (mirrors upgrade logic)
  const avgLevel =
    buildings.reduce((sum, b) => sum + b.level, 0) / buildings.length;
  const satisfaction = Math.min(100, Math.round((avgLevel - 1) * 30 + 50));

  // ── Handlers ─────────────────────────────────────────────────────────────

  // Upgrade a single building by id (mirrors upgradeBtn click handler)
  const handleUpgrade = (id: number) => {
    if (cityResources < UPGRADE_COST) {
      alert("Недостатньо ресурсів");
      return;
    }
    setCityResources((prev) => prev - UPGRADE_COST);
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, level: b.level + 1 } : b
      )
    );
  };

  // Submit comment (mirrors form submit handler)
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !commentText.trim()) {
      alert("Заповніть усі поля");
      return;
    }
    setComments((prev) => [
      ...prev,
      { id: Date.now(), username: username.trim(), text: commentText.trim() },
    ]);
    setUsername("");
    setCommentText("");
  };

  // Filter buildings (Завдання 2 – фільтрація за категоріями)
  const visibleBuildings =
    filter === "all"
      ? buildings
      : buildings.filter((b) => b.category === filter);

  // ── Building info list (mirrors do..while loop) ────────────────────────
  const buildingNames = buildings.map((b) => b.name);

  return (
    <>
      {/* ── Section: Моє місто ── */}
      <section id="city">
        <h2>Моє місто</h2>
        <p>Тут відображаються будівлі та ресурси міста.</p>

        {/* Фільтрація за категоріями (Завдання 2) */}
        <CityFilter active={filter} onChange={setFilter} />

        {/* City grid – BuildingCard components (Завдання 1) */}
        <div className="city-grid">
          {visibleBuildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              onUpgrade={handleUpgrade}
              cityResources={cityResources}
            />
          ))}
        </div>

        {visibleBuildings.length === 0 && (
          <p style={{ marginTop: "20px", color: "#888" }}>
            Немає будівель у цій категорії.
          </p>
        )}

        <button
          onClick={() => {
            // Upgrade first building as default (mirrors original upgradeBtn)
            if (buildings[0]) handleUpgrade(buildings[0].id);
          }}
        >
          Покращити будівлю
        </button>

        {/* Resources info (mirrors #resourcesInfo) */}
        <h3 id="resourcesInfo" style={{ marginTop: "16px" }}>
          Ресурси міста: {cityResources}
        </h3>

        {/* Building info list (mirrors do..while buildingInfo) */}
        <div id="buildingInfo">
          <h3>Будівлі міста</h3>
          {buildingNames.map((name, i) => (
            <p key={i}>{name}</p>
          ))}
        </div>

        {/* Satisfaction Indicator (Завдання 1) */}
        <SatisfactionIndicator value={satisfaction} />
      </section>

      {/* ── Section: Коментарі мешканців ── */}
      <section id="feedback">
        <h2>Коментарі мешканців</h2>

        <button onClick={() => setShowComments((prev) => !prev)}>
          Показати / приховати коментарі
        </button>

        {showComments && (
          <div id="commentsSection">
            <form onSubmit={handleCommentSubmit} style={{ marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Ваше ім'я"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <textarea
                placeholder="Ваш коментар"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Надіслати</button>
            </form>

            <div id="commentsList">
              {comments.map((c) => (
                <div key={c.id} className="comment">
                  <h3>{c.username}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CityPage;
