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
