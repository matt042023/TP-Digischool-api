const mongoose = require("mongoose");

const ProfesseurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String },
    date_naissance: { type: Date },
    adresse: { type: String },
    sexe: { type: String, enum: ["HOMME", "FEMME"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Professeur", ProfesseurSchema);

// Données d'exemple pour les professeurs
const professeurs = [
  {
    id: 1,
    nom: "GERMAIN",
    prenom: "Christophe",
    dateNaissance: "1971-01-02",
    adresse: "15 rue du printemps 59000 LILLE",
    sexe: "HOMME",
  },
  {
    id: 2,
    nom: "LOUREIRO",
    prenom: "Julie",
    dateNaissance: "1982-01-08",
    adresse: "72 av. Matignon 75003 Paris",
    sexe: "FEMME",
  },
];

module.exports = professeurs;
