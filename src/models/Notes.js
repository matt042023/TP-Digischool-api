const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  date_saisie: {
    type: Date,
    default: Date.now
  },
  ideleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Eleve",
    required: true
  },
  idclasse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: true
  },
  idmatiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matiere",
    required: true
  },
  idprof: {
    type: Number, // pareil ici, peut devenir ref vers une collection Prof
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
