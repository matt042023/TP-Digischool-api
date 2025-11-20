const mongoose = require("mongoose");

//schéma de la classe
const matiereSchema = new mongoose.Schema({
    nom: { type: String, required: true} //nom de la matière, obligatoire
});

// Création du modèle
const Matiere = mongoose.model("Matiere", matiereSchema);

// Export du modèle
module.exports = Matiere;