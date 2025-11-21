const mongoose = require("mongoose");

const EleveSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: false },
    classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: true,
    },
    date_naissance: { type: Date },
    adresse: { type: String },
    sexe: { type: String, enum: ["HOMME", "FEMME"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Eleve", EleveSchema);

// Données d'exemple pour les élèves
const eleves = [
  {
    id: 1,
    nom: "Durand",
    prenom: "Marie",
    classe: 1,
    dateNaissance: "2015-01-02",
    adresse: "15 rue du Lac 75001 Paris",
    sexe: "FEMME",
  },
  {
    id: 2,
    nom: "Dupond",
    prenom: "Pierre",
    classe: 2,
    dateNaissance: "2014-04-08",
    adresse: "15 rue du Lac 75001 Paris",
    sexe: "HOMME",
  },
];

module.exports = eleves;
