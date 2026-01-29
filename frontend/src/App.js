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

import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/analyze/all")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return <h2>Loading Smart Analysis...</h2>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Smart Forex Analyst - Multi Pair & Multi Timeframe</h1>

      {data.map(({ pair, analysis }) => (
        <div key={pair} style={{ marginBottom: 30 }}>
          <h2>{pair}</h2>
          {analysis.map((tfData, i) => (
            <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
              <h4>Timeframe: {tfData.timeframe}</h4>
              <h3 style={{ color: tfData.direction === "BUY" ? "green" : "red" }}>
                {tfData.decision}
              </h3>
              <p>Score: {tfData.score}</p>
              <ul>
                {tfData.reasons.map((r, idx) => <li key={idx}>{r}</li>)}
              </ul>
              <p>Entry: {tfData.tradePlan.entry} | Stop: {tfData.tradePlan.stop} | TP1: {tfData.tradePlan.tp1} | TP2: {tfData.tradePlan.tp2} | Secure: {tfData.tradePlan.secureAt}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
