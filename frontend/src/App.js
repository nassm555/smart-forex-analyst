import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/analyze")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div style={styles.loading}>
        Loading Smart Analysis...
      </div>
    );
  }

  const { pair, analysis } = data;

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Smart Forex Analyst</h1>

      <div style={styles.card}>
        <h2 style={styles.pair}>{pair}</h2>

        <div style={styles.row}>
          <span>Decision</span>
          <span style={analysis.decision.includes("BUY") ? styles.buy : styles.sell}>
            {analysis.decision}
          </span>
        </div>

        <div style={styles.row}>
          <span>Direction</span>
          <span>{analysis.direction}</span>
        </div>

        <div style={styles.row}>
          <span>Confidence Score</span>
          <span>{analysis.score}%</span>
        </div>
      </div>

      <div style={styles.card}>
        <h3>Reasons</h3>
        <ul>
          {analysis.reasons.map((r, i) => (
            <li key={i} style={styles.reason}>{r}</li>
          ))}
        </ul>
      </div>

      <div style={styles.card}>
        <h3>Trade Plan</h3>

        <div style={styles.tradeRow}>
          <span>Entry</span>
          <span>{analysis.tradePlan.entry}</span>
        </div>

        <div style={styles.tradeRow}>
          <span>Stop Loss</span>
          <span style={styles.sell}>{analysis.tradePlan.stop}</span>
        </div>

        <div style={styles.tradeRow}>
          <span>Take Profit 1</span>
          <span style={styles.buy}>{analysis.tradePlan.tp1}</span>
        </div>

        <div style={styles.tradeRow}>
          <span>Take Profit 2</span>
          <span style={styles.buy}>{analysis.tradePlan.tp2}</span>
        </div>

        <div style={styles.tradeRow}>
          <span>Secure At (BE)</span>
          <span>{analysis.tradePlan.secureAt}</span>
        </div>
      </div>

      <footer style={styles.footer}>
        Institutional Logic • London Session • Smart Risk
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0e1117",
    color: "#e6edf3",
    fontFamily: "Segoe UI, sans-serif",
    padding: 20,
    maxWidth: 650,
    margin: "0 auto"
  },
  title: {
    textAlign: "center",
    marginBottom: 30
  },
  loading: {
    background: "#0e1117",
    color: "#e6edf3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18
  },
  card: {
    background: "#161b22",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.4)"
  },
  pair: {
    marginBottom: 15
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  },
  tradeRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 15
  },
  reason: {
    marginBottom: 6,
    color: "#9da7b3"
  },
  buy: {
    color: "#2ecc71",
    fontWeight: "bold"
  },
  sell: {
    color: "#e74c3c",
    fontWeight: "bold"
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    opacity: 0.6,
    marginTop: 30
  }
};

export default App;
