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
