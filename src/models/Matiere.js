/**
 * Modèle Mongoose représentant une matière scolaire.
 * @module models/Matiere
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose représentant une matière.
 * @typedef {Object} Matiere
 * @property {string} nom - Nom de la matière (obligatoire).
 */
const matiereSchema = new mongoose.Schema({
  /**
   * Nom de la matière.
   * @type {String}
   * @required
   */
  nom: { type: String, required: true }
});

/**
 * Modèle Mongoose permettant d'interagir avec les matières dans MongoDB.
 * @type {mongoose.Model<Matiere>}
 */
const Matiere = mongoose.model("Matiere", matiereSchema);

module.exports = Matiere;
