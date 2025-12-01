require("dotenv").config();
/**
 * Description placeholder
 *
 * @type {*}
 */
const express = require("express");
/**
 * Description placeholder
 *
 * @type {*}
 */
const connectDB = require("./config/db");

//import des routes
/**
 * Description placeholder
 *
 * @type {*}
 */
const classeRoutes = require("./routes/classeRoutes.js");
/**
 * Description placeholder
 *
 * @type {*}
 */
const matiereRoutes = require("./routes/matiereRoutes.js");
/**
 * Description placeholder
 *
 * @type {*}
 */
const eleveRoutes = require("./routes/eleveRoutes.js");
/**
 * Description placeholder
 *
 * @type {*}
 */
const professeurRoutes = require("./routes/professeurRoutes.js");
/**
 * Description placeholder
 *
 * @type {*}
 */
const notesRoutes = require("./routes/notesRoutes.js");
/**
 * Description placeholder
 *
 * @type {*}
 */
const trimestreRoutes = require("./routes/trimestreRoutes.js");

//import Swagger
/**
 * Description placeholder
 *
 * @type {*}
 */
const { swaggerUi, specs } = require("./config/swagger");


/**
 * Description placeholder
 *
 * @type {*}
 */
const app = express();
connectDB();
/**
 * Description placeholder
 *
 * @type {3000}
 */
const PORT = 3000;

// Sécurité
/**
 * Description placeholder
 *
 * @type {*}
 */
const helmet = require("helmet");
/**
 * Description placeholder
 *
 * @type {*}
 */
const cors = require("cors");
/**
 * Description placeholder
 *
 * @type {*}
 */
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(cors());

/**
 * Description placeholder
 *
 * @type {*}
 */
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
