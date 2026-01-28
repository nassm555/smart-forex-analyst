const express = require("express");
const cors = require("cors");
const analyzeTrade = require("./logicEngine");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/analyze", (req, res) => {
  const marketData = {
    liquiditySweep: "LOW",   // HIGH = SELL | LOW = BUY
    fvg: true,
    csid: true,
    smt: true,
    timeAligned: true,
    session: "London"
  };

  const analysis = analyzeTrade(marketData);

  res.json({
    pair: "EURUSD",
    analysis
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
