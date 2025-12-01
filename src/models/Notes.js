const mongoose = require("mongoose");

/**
 * @typedef {Object} Notes
 * @property {Date} dateSaisie - Date de saisie de la note (par défaut: date actuelle)
 * @property {mongoose.Schema.Types.ObjectId} idEleve - Référence vers l'élève
 * @property {mongoose.Schema.Types.ObjectId} idClasse - Référence vers la classe
 * @property {mongoose.Schema.Types.ObjectId} idMatiere - Référence vers la matière
 * @property {mongoose.Schema.Types.ObjectId} idProf - Référence vers le professeur
 * @property {mongoose.Schema.Types.ObjectId} idTrimestre - Référence vers le trimestre
 * @property {Number} note - Valeur de la note
 * @property {String} avis - Avis du professeur sur la note
 * @property {Number} avancement - Niveau d'avancement de l'élève
 */

/**
 * Schéma Mongoose pour les notes des élèves
 * @type {mongoose.Schema}
 */
const NotesSchema = new mongoose.Schema({
  dateSaisie: {
    type: Date,
    default: Date.now
  },
  idEleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Eleve",
    required: true
  },
  idClasse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: true
  },
  idMatiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matiere",
    required: true
  },
  idProf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professeur",
    required: true
  },
  idTrimestre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trimestre",
    required: true
  },
  note: {
    type: Number,
    required: true
  },
  avis: {
    type: String,
    required: true
  },
  avancement: {
    type: Number,
    required: true
  }
});

/**
 * Modèle Mongoose pour les notes
 * @type {mongoose.Model<Notes>}
 */
module.exports = mongoose.model("Notes", NotesSchema);