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
  return notesRepository.findByProfesseur(professeurId);
};

exports.getNotesByTrimestreAndClasse = (trimestreId, classeId) => {
  return notesRepository.findByTrimestreAndClasse(trimestreId, classeId);
};