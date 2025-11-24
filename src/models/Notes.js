const mongoose = require("mongoose");

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

module.exports = mongoose.model("Notes", NotesSchema);