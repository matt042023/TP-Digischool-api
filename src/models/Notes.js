const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  date_saisie: {
    type: Date,
    default: Date.now
  },
  ideleve: {
    type: Number,
    ref: "Eleve",
    required: true
  },
  idclasse: {
    type: Number,
    ref: "Classe",
    required: true
  },
  idmatiere: {
    type: Number,
    ref: "Matiere",
    required: true
  },
  idprof: {
    type: Number,
    required: true
  },
  idtrimestre: {
    type: Number,
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