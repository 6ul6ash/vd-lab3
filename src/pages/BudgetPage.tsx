// src/pages/BuildPage.tsx

import { useState } from "react";

interface BuildProject {
  id: number;
  name: string;
  emoji: string;
  cost: number;
  duration: number; // секунди
  progress: number; // 0-100
  status: "idle" | "building" | "done";
}

const PROJECTS: Omit<BuildProject, "id" | "progress" | "status">[] = [
  { name: "Житловий будинок", emoji: "🏠", cost: 300,  duration: 8  },
  { name: "Торговий центр",   emoji: "🏬", cost: 700,  duration: 15 },
  { name: "Завод",            emoji: "🏭", cost: 500,  duration: 12 },
  { name: "Школа",            emoji: "🏫", cost: 400,  duration: 10 },
  { name: "Лікарня",          emoji: "🏥", cost: 600,  duration: 14 },
  { name: "Парк",             emoji: "🌳", cost: 150,  duration: 5  },
];

const BuildPage = () => {
  const [budget, setBudget] = useState<number>(2000);
  const [projects, setProjects] = useState<BuildProject[]>(
    PROJECTS.map((p, i) => ({ ...p, id: i + 1, progress: 0, status: "idle" }))
  );
  const [log, setLog] = useState<string[]>(["🏙️ Місто чекає на розвиток..."]);

  const addLog = (msg: string) =>
    setLog((prev) => [msg, ...prev].slice(0, 6));

  const startBuilding = (project: BuildProject) => {
    if (budget < project.cost) {
      alert("Недостатньо бюджету!");
      return;
    }
    if (project.status === "building") return;

    setBudget((b) => b - project.cost);
    addLog(`🔨 Розпочато будівництво: ${project.emoji} ${project.name}`);

    // Оновлюємо статус на "building"
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, status: "building", progress: 0 } : p
      )
    );

    // Симулюємо прогрес будівництва через інтервал
    const intervalMs = (project.duration * 1000) / 100;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, progress: current } : p
        )
      );

      if (current >= 100) {
        clearInterval(interval);
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id
              ? { ...p, progress: 100, status: "done" }
              : p
          )
        );
        addLog(`✅ Завершено: ${project.emoji} ${project.name}`);
      }
    }, intervalMs);
  };

  const resetProject = (project: BuildProject) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, progress: 0, status: "idle" } : p
      )
    );
    addLog(`🔄 Скинуто: ${project.emoji} ${project.name}`);
  };

  return (
    <section id="build">
      <h2>Будівництво</h2>
      <p>Обери проект та розпочни будівництво. Стеж за прогресом у реальному часі!</p>

      {/* Бюджет */}
      <div className="budget-inline">
        💰 Доступний бюджет: <strong>{budget} грн</strong>
        <button
          className="subsidy-btn"
          onClick={() => {
            setBudget((b) => b + 1000);
            addLog("💵 Отримано субсидію: +1000 грн");
          }}
        >
          Отримати субсидію +1000
        </button>
      </div>

      {/* Проекти */}
      <div className="projects-grid">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`project-card ${p.status === "done" ? "project-done" : ""}`}
          >
            <div className="project-header">
              <span className="project-emoji">{p.emoji}</span>
              <div>
                <h3>{p.name}</h3>
                <p className="project-meta">
                  💰 {p.cost} грн · ⏱ {p.duration} сек
                </p>
              </div>
            </div>

            {/* Прогрес-бар */}
            <div className="progress-bg">
              <div
                className="progress-fill"
                style={{
                  width: `${p.progress}%`,
                  backgroundColor:
                    p.status === "done"
                      ? "#2ecc71"
                      : p.status === "building"
                      ? "#f39c12"
                      : "#95a5a6",
                }}
              />
            </div>
            <p className="progress-label">
              {p.status === "idle"    && "Очікує"}
              {p.status === "building" && `Будується... ${p.progress}%`}
              {p.status === "done"    && "✅ Збудовано!"}
            </p>

            {/* Кнопки */}
            <div className="project-actions">
              {p.status !== "building" && p.status !== "done" && (
                <button
                  onClick={() => startBuilding(p)}
                  disabled={budget < p.cost}
                  className={budget < p.cost ? "btn-disabled" : ""}
                >
                  Розпочати
                </button>
              )}
              {p.status === "done" && (
                <button onClick={() => resetProject(p)} className="btn-reset">
                  Знести і перебудувати
                </button>
              )}
              {p.status === "building" && (
                <button disabled className="btn-disabled">
                  Будується...
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Лог подій */}
      <div className="build-log">
        <h3>📋 Журнал подій</h3>
        {log.map((entry, i) => (
          <p key={i} className="log-entry" style={{ opacity: 1 - i * 0.15 }}>
            {entry}
          </p>
        ))}
      </div>
    </section>
  );
};

export default BuildPage;
