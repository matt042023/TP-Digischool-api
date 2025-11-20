const mongoose = require("mongoose");

const TrimestreSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Trimestre", TrimestreSchema);
