const express = require("express");
const classeRoutes = require("./routes/classeRoutes.js");
const matiereRoutes = require("./routes/matiereRoutes.js");
const eleveRoutes = require("./routes/eleveRoutes.js");
const professeurRoutes = require("./routes/professeurRoutes.js");

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/classes", classeRoutes);
app.use("/matieres", matiereRoutes);
app.use("/eleves", eleveRoutes);
app.use("/professeurs", professeurRoutes);

// Route par défaut
app.get("/", (req, res) => res.send("API Digischool OK"));

// Lancement du serveur
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
