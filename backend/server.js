const express = require("express");
const cors = require("cors");
const analyzeAllPairsMultiTF = require("./logicEngine");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * API: تحليل جميع الأزواج + جميع الأطر الزمنية
 */
app.get("/api/analyze/all", (req, res) => {
  const results = analyzeAllPairsMultiTF();
  res.json(results);
});

/**
 * API: زوج واحد (للواجهة الحالية)
 */
app.get("/api/analyze", (req, res) => {
  const result = analyzeAllPairsMultiTF()[0];
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
