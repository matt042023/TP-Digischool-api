/**
 * Modèle Mongoose représentant une classe scolaire.
 * @module models/Classe
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose représentant une classe.
 * @typedef {Object} Classe
 * @property {string} nom - Nom de la classe (obligatoire).
 * @property {mongoose.Types.ObjectId} prof - Identifiant du professeur associé (référence au modèle Professeur).
 */
const classeSchema = new mongoose.Schema({
  /**
   * Nom de la classe.
   * @type {String}
   * @required
   */
  nom: { type: String, required: true },

  /**
   * Référence vers le professeur responsable de la classe.
   * @type {mongoose.Schema.Types.ObjectId}
   * @ref Professeur
   * @required
   */
  prof: { type: mongoose.Schema.Types.ObjectId, ref: "Professeur", required: true }
});

/**
 * Modèle Mongoose permettant d'interagir avec les classes dans MongoDB.
 * @type {mongoose.Model<Classe>}
 */
module.exports = mongoose.model("Classe", classeSchema);
