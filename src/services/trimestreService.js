const trimestreRepository = require("../repositories/trimestreRepository");

exports.getAllTrimestres = () => {
  return trimestreRepository.findAll();
};

exports.getTrimestreById = (id) => {
  return trimestreRepository.findById(id);
};

exports.createTrimestre = (data) => {
  if (!data.date || !data.nom) {
    throw new Error('La date et/ou le nom sont obligatoires'); 
  }
  return trimestreRepository.create(data);
};

exports.updateTrimestre = (id, data) => {
  if (!data.date || !data.nom) {
    throw new Error('La date et/ou le nom sont obligatoires');
  }
  return trimestreRepository.update(id, data);
};

exports.deleteTrimestre = (id) => {
  return trimestreRepository.delete(id);
};