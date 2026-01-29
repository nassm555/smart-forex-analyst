const express = require("express");
const cors = require("cors");
const path = require("path");
const analyzeTrade = require("./logicEngine");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ===== API ===== */
app.get("/api/analyze", (req, res) => {
  const marketData = {
    liquiditySweep: "LOW",
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

/* ===== Serve React build (SAFE) ===== */
const buildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(buildPath));

// 👇 هذا هو الحل (بدون *)
app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

/* ===== Start Server ===== */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});



const express = require("express");
const cors = require("cors");
const path = require("path");
const analyzeAllPairsMultiTF = require("./logicEngine");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint للزوج الواحد (قديم)
app.get("/api/analyze", (req, res) => {
  const analysis = analyzeAllPairsMultiTF()[0].analysis[0];
  res.json({
    pair: "EURUSD",
    analysis
  });
});

// API Endpoint لجميع الأزواج مع الأطر الزمنية
app.get("/api/analyze/all", (req, res) => {
  const results = analyzeAllPairsMultiTF();
  res.json(results);
});

// Serve React build
const buildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(buildPath));

app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
