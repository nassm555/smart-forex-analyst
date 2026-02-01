import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analyze/all")
      .then((res) => res.json())
      .then((json) => {
        console.log("ALL DATA:", json);
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading Smart Analysis...</div>;
  }

  return (
    <div className="app">
      <h1>Smart Forex Analyst</h1>

      {data.map((pairBlock) => (
        <div key={pairBlock.pair} className="pair-block">
          <h2>{pairBlock.pair}</h2>

          {pairBlock.analysis.map((tf) => (
            <div key={tf.timeframe} className="tf-card">
              <strong>
                {tf.timeframe} — {tf.decision}
              </strong>

              <p>Score: {tf.score}</p>
              <p>Entry: {tf.tradePlan.entry}</p>
              <p>SL: {tf.tradePlan.stop}</p>
              <p>TP1: {tf.tradePlan.tp1}</p>
              <p>TP2: {tf.tradePlan.tp2}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
