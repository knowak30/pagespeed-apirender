const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // <--- DODAJ TO
const app = express();

app.use(cors()); // <--- DODAJ TO


app.get("/api/pagespeed", async (req, res) => {
  const { url, strategy } = req.query;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  const apiKey = "AIzaSyCIg_L8MgBQ7n1HweXNHkaz5QCdmlmmwMo"; // ← Wklej swój API key!
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Google API error", details: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
