const express = require("express");
const app = express();

app.use(express.json());

// Routes principales
app.use("/api/eleves", require("./routes/eleveRoutes"));
app.use("/api/professeurs", require("./routes/professeurRoutes"));

app.get("/", (req, res) => {
  res.send("API Digischool (local data) 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
