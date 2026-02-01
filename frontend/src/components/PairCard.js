import React, { useState } from "react";
import "./PairCard.css";

export default function PairCard({ pairData }) {
  const [openTF, setOpenTF] = useState(null);

  return (
    <div className="pair-card">
      <h2>{pairData.pair}</h2>

      {pairData.analysis.map(tf => (
        <div key={tf.timeframe} className="tf-block">
          <div
            className={`tf-header ${tf.direction.toLowerCase()}`}
            onClick={() =>
              setOpenTF(openTF === tf.timeframe ? null : tf.timeframe)
            }
          >
            <span>{tf.timeframe}</span>
            <strong>{tf.decision}</strong>
          </div>

          {openTF === tf.timeframe && (
            <div className="tf-details">
              <p><b>Entry:</b> {tf.tradePlan.entry}</p>
              <p><b>Stop:</b> {tf.tradePlan.stop}</p>
              <p><b>TP1:</b> {tf.tradePlan.tp1}</p>
              <p><b>TP2:</b> {tf.tradePlan.tp2}</p>
              <p><b>Secure At:</b> {tf.tradePlan.secureAt}</p>

              <ul>
                {tf.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
