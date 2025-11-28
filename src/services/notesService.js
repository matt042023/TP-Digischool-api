const notesRepository = require('../repositories/notesRepository');

exports.getAllNotes = () => {
  return notesRepository.findAll();
};

exports.getNoteById = (id) => {
  return notesRepository.findById(id);
};

exports.createNote = (data) => {
  if (data.note && (data.note < 0 || data.note > 20)) {
    throw new Error('La note doit être comprise entre 0 et 20');
  }
  return notesRepository.create(data);
};

exports.updateNote = (id, data) => {
  if (data.note && (data.note < 0 || data.note > 20)) {
    throw new Error('La note doit être comprise entre 0 et 20');
  }
  return notesRepository.update(id, data);
};

exports.deleteNote = (id) => {
  return notesRepository.delete(id);
};

exports.getNotesByProfesseur = (professeurId) => {
  if (!professeurId) {
    throw new Error('L\'ID du professeur est requis');
  }
  return notesRepository.findByProfesseur(professeurId);
};

exports.getNotesByTrimestreAndClasse = (trimestreId, classeId) => {
  if (!trimestreId || !classeId) {
    throw new Error('L\'ID du trimestre et de la classe sont requis');
  }
  return notesRepository.findByTrimestreAndClasse(trimestreId, classeId);
};