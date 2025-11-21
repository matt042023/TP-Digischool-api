const mongoose = require("mongoose");

const EleveSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: false },
    classe: { type: Number, required: true },
    date_naissance: { type: Date },
    adresse: { type: String },
    sexe: { type: String, enum: ["HOMME", "FEMME"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Eleve", EleveSchema);
