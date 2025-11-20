const express = require("express");
const connectDB = require("./config/database");
const classeRoutes = require("./routes/classeRoutes");
const matiereRoutes = require("./routes/matiereRoutes");

const app = express();
app.use(express.json());

// Connexion à MongoDB et démarrage du serveur seulement après succès
const PORT = 3000;

const startServer = async () => {
  try {
    await connectDB(); // attend que la connexion soit réussie
    app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
  } catch (err) {
    console.error("Impossible de démarrer le serveur :", err);
  }
};

startServer();

// Routes
app.use("/classes", classeRoutes);
app.use("/matieres", matiereRoutes);

// Route par défaut
app.get("/", (req, res) => res.send("API Digischool OK"));
