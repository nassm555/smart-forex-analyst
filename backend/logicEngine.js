function analyzeTrade(data) {
  let reasons = [];
  let score = 0;
  let direction = "NONE";

  // 1️⃣ Liquidity Sweep
  if (data.liquiditySweep) {
    score += 20;
    reasons.push("Liquidity sweep confirmed");

    if (data.liquiditySweep === "HIGH") direction = "SELL";
    if (data.liquiditySweep === "LOW") direction = "BUY";
  }

  // 2️⃣ IFVG / FVG
  if (data.fvg) {
    score += 15;
    reasons.push("Valid FVG / IFVG");
  }

  // 3️⃣ CSID
  if (data.csid) {
    score += 20;
    reasons.push("Market structure shift (CSID)");
  }

  // 4️⃣ SMT Divergence
  if (data.smt) {
    score += 15;
    reasons.push("SMT divergence confirmed");
  }

  // 5️⃣ Timeframe Alignment
  if (data.timeAligned) {
    score += 15;
    reasons.push("HTF & LTF aligned");
  }

  // 6️⃣ London Session
  if (data.session === "London") {
    score += 15;
    reasons.push("London session active");
  }

  // 🎯 Decision
  let decision = "NO TRADE";

  if (score >= 80 && direction !== "NONE") {
    decision = "STRONG " + direction;
  } else if (score >= 60 && direction !== "NONE") {
    decision = direction;
  }

  // 💰 Trade Plan (Entry / SL / TP / BE)
  let entry = null;
  let stop = null;
  let tp1 = null;
  let tp2 = null;
  let secureAt = null;

  if (decision.includes("BUY")) {
    entry = 1.0830;
    stop = 1.0815;
    tp1 = entry + (entry - stop);      // 1R
    tp2 = entry + 2 * (entry - stop);  // 2R
    secureAt = tp1;
  }

  if (decision.includes("SELL")) {
    entry = 1.0900;
    stop = 1.0915;
    tp1 = entry - (stop - entry);      // 1R
    tp2 = entry - 2 * (stop - entry);  // 2R
    secureAt = tp1;
  }

  return {
    decision,
    direction,
    score,
    reasons,
    tradePlan: {
      entry,
      stop,
      tp1,
      tp2,
      secureAt
    }
  };
}

module.exports = analyzeTrade;
