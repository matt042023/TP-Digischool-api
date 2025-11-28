require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

//import des routes
const classeRoutes = require("./routes/classeRoutes.js");
const matiereRoutes = require("./routes/matiereRoutes.js");
const eleveRoutes = require("./routes/eleveRoutes.js");
const professeurRoutes = require("./routes/professeurRoutes.js");
const notesRoutes = require("./routes/notesRoutes.js");
const trimestreRoutes = require("./routes/trimestreRoutes.js");

//import Swagger
const { swaggerUi, specs } = require("./config/swagger");


const app = express();
connectDB();
const PORT = 3000;

// Sécurité
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});
app.use(limiter);

// Middleware pour parser le JSON
app.use(express.json());

//ajout Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/classes", classeRoutes);
app.use("/matieres", matiereRoutes);
app.use("/eleves", eleveRoutes);
app.use("/professeurs", professeurRoutes);
app.use("/notes", notesRoutes);
app.use("/trimestres", trimestreRoutes);

// Route par défaut
app.get("/", (req, res) => res.send("API Digischool  + MongoDB"));

// Lancement du serveur
if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
  );
}

module.exports = app;
