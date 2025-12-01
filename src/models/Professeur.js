/**
 * @fileoverview Modèle Mongoose pour la gestion des professeurs
 * @module models/Professeur
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour un professeur
 * @typedef {Object} ProfesseurSchema
 * @property {string} nom - Nom du professeur (obligatoire)
 * @property {string} [prenom] - Prénom du professeur (optionnel)
 * @property {Date} [date_naissance] - Date de naissance du professeur
 * @property {string} [adresse] - Adresse du professeur
 * @property {string} sexe - Sexe du professeur (HOMME ou FEMME) (obligatoire)
 * @property {Date} createdAt - Date de création (généré automatiquement)
 * @property {Date} updatedAt - Date de dernière modification (généré automatiquement)
 */
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

/**
 * Modèle Mongoose pour les professeurs
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("Professeur", ProfesseurSchema);
