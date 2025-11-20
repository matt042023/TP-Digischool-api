const trimestreRepository = require("../repositories/trimestreRepository");

exports.getAllTrimestres = () => {
  return trimestreRepository.findAll();
};

exports.getTrimestreById = (id) => {
  return trimestreRepository.findById(id);
};

exports.createTrimestre = (data) => {
  if (data.date_debut && data.date_fin && data.date_debut > data.date_fin) {
    throw new Error('La date de début doit être avant la date de fin');
  }
  return trimestreRepository.create(data);
};

exports.updateTrimestre = (id, data) => {
  if (data.date_debut && data.date_fin && data.date_debut > data.date_fin) {
    throw new Error('La date de début doit être avant la date de fin');
  }
  return trimestreRepository.update(id, data);
};

exports.deleteTrimestre = (id) => {
  return trimestreRepository.delete(id);
};