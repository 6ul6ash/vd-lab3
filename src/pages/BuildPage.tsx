// src/pages/BuildPage.tsx

const AVAILABLE_BUILDINGS = [
  { name: "Житловий будинок", materials: 50,  workers: 5,  budget: 300  },
  { name: "Торговий центр",   materials: 120, workers: 15, budget: 700  },
  { name: "Завод",            materials: 200, workers: 20, budget: 500  },
  { name: "Школа",            materials: 80,  workers: 10, budget: 400  },
  { name: "Лікарня",          materials: 100, workers: 12, budget: 600  },
  { name: "Парк",             materials: 20,  workers: 3,  budget: 150  },
];

const BuildPage = () => {
  return (
    <section id="build">
      <h2>Будівництво</h2>

      <p>Для будівництва потрібні ресурси та робітники.</p>

      <ul>
        <li>Будівельні матеріали</li>
        <li>Робітники</li>
        <li>Бюджет</li>
      </ul>

      <h3 style={{ marginTop: "30px" }}>Доступні будівлі</h3>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        Перелік будівель та необхідні ресурси для їх зведення.
      </p>

      <table className="buildings-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Матеріали (од.)</th>
            <th>Робітники (осіб)</th>
            <th>Бюджет (грн)</th>
          </tr>
        </thead>
        <tbody>
          {AVAILABLE_BUILDINGS.map((b, i) => (
            <tr key={i}>
              <td>{b.name}</td>
              <td>{b.materials}</td>
              <td>{b.workers}</td>
              <td>{b.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BuildPage;
