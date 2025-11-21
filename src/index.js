// const express = require("express");
// const connectDB = require("./config/database");
// const classeRoutes = require("./routes/classeRoutes");
// const matiereRoutes = require("./routes/matiereRoutes");

// const app = express();
// app.use(express.json());

// // Connexion à MongoDB et démarrage du serveur seulement après succès
// const PORT = 3000;

// const startServer = async () => {
//   try {
//     await connectDB(); // attend que la connexion soit réussie
//     app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
//   } catch (err) {
//     console.error("Impossible de démarrer le serveur :", err);
//   }
// };

// startServer();

// // Routes
// app.use("/classes", classeRoutes);
// app.use("/matieres", matiereRoutes);

// // Route par défaut
// app.get("/", (req, res) => res.send("API Digischool OK"));


require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const classeRoutes = require("./routes/classeRoutes.js");
const matiereRoutes = require("./routes/matiereRoutes.js");
// const eleveRoutes = require("./routes/eleveRoutes.js");
// const professeurRoutes = require("./routes/professeurRoutes.js");
// const notesRoutes = require("./routes/notesRoutes.js");
// const trimestreRoutes = require("./routes/trimestreRoutes.js");

const app = express();
connectDB();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/classes", classeRoutes);
app.use("/matieres", matiereRoutes);
// app.use("/eleves", eleveRoutes);
// app.use("/professeurs", professeurRoutes);
// app.use("/notes", notesRoutes);
// app.use("/trimestres", trimestreRoutes);

// Route par défaut
app.get("/", (req, res) => res.send("API Digischool  + MongoDB"));

// Lancement du serveur
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);