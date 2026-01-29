import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/analyze")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return <h2>Loading Smart Analysis...</h2>;

  const { pair, analysis } = data;
  const { decision, direction, score, reasons, tradePlan } = analysis;

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Smart Forex Analyst</h1>
      <h2>{pair}</h2>

      <h3 style={{ color: direction === "BUY" ? "green" : "red" }}>
        {decision}
      </h3>

      <p><strong>Score:</strong> {score}/100</p>

      <h4>Reasons</h4>
      <ul>
        {reasons.map((r, i) => <li key={i}>{r}</li>)}
      </ul>

      <h4>Trade Plan</h4>
      <p>Entry: {tradePlan.entry}</p>
      <p>Stop Loss: {tradePlan.stop}</p>
      <p>TP1: {tradePlan.tp1}</p>
      <p>TP2: {tradePlan.tp2}</p>
      <p>Secure at (BE): {tradePlan.secureAt}</p>
    </div>
  );
}

export default App;
