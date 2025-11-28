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
