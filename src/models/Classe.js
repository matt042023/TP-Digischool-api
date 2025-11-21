const mongoose = require("mongoose");

//schéma de la classe
const classeSchema = new mongoose.Schema({
    nom: { type: String, required: true}, //nom de la classe obligatoire
    prof: { type: Number, required: true}  // id du professeur, obligatoire
});

//Export du modèle
module.exports = mongoose.model("Classe", classeSchema);