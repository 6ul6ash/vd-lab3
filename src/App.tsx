// src/App.tsx

import {  HashRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import CityPage from "./pages/CityPage";
import BuildPage from "./pages/BuildPage";
import ResourcesPage from "./pages/ResourcesPage";
import "./App.css";

function AppInner() {
  const location = useLocation();

  const titleMap: Record<string, string> = {
    "/":           "Моє місто",
    "/build":      "Будівництво",
    "/resources":  "Ресурси",
  };
  document.title =
    titleMap[location.pathname] ?? "Симулятор управління будівництвом містом";

  return (
    <div className="app-wrapper">

      <header>
        <h1>Симулятор управління будівництвом містом</h1>

        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Моє місто
              </NavLink>
            </li>
            <li>
              <NavLink to="/build" className={({ isActive }) => (isActive ? "active" : "")}>
                Будівництво
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources" className={({ isActive }) => (isActive ? "active" : "")}>
                Ресурси
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/"          element={<CityPage />} />
          <Route path="/build"     element={<BuildPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </main>

      <footer>
        <h2>Контакти</h2>
        <p>Email: city@simulator.com</p>
        <p>Телефон: +380 00 000 00 00</p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  );
}

export default App;

