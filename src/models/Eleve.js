/**
 * @fileoverview Modèle Mongoose pour la gestion des élèves
 * @module models/Eleve
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour un élève
 * @typedef {Object} EleveSchema
 * @property {string} nom - Nom de l'élève (obligatoire)
 * @property {string} [prenom] - Prénom de l'élève (optionnel)
 * @property {mongoose.Schema.Types.ObjectId} classe - Référence vers la classe de l'élève (obligatoire)
 * @property {Date} [date_naissance] - Date de naissance de l'élève
 * @property {string} [adresse] - Adresse de l'élève
 * @property {string} sexe - Sexe de l'élève (HOMME ou FEMME) (obligatoire)
 * @property {Date} createdAt - Date de création (généré automatiquement)
 * @property {Date} updatedAt - Date de dernière modification (généré automatiquement)
 */
const EleveSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: false },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe", required: true },
    date_naissance: { type: Date },
    adresse: { type: String },
    sexe: { type: String, enum: ["HOMME", "FEMME"], required: true },
  },
  { timestamps: true }
);

/**
 * Modèle Mongoose pour les élèves
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("Eleve", EleveSchema);
