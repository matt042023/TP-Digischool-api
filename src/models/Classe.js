const mongoose = require("mongoose");

//schéma de la classe
const classeSchema = new mongoose.Schema({
    nom: { type: String, required: true}, //nom de la classe obligatoire
    prof: { type: mongoose.Schema.Types.ObjectId, ref: "Professeur", required: true}  // référence au professeur, obligatoire
});

//Export du modèle
module.exports = mongoose.model("Classe", classeSchema);