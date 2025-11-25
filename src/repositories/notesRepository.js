const notesRepository = require('../models/Notes');

exports.findAll = () => {
  return notesRepository.find();
}

exports.findById = (id) => {
  return notesRepository.findById(id);
}

exports.create = (data) => {
  return notesRepository.create(data);
}

exports.update = (id, data) => {
  return notesRepository.findByIdAndUpdate(id, data, { new: true });
}

exports.delete = (id) => {
  return notesRepository.findByIdAndDelete(id);
}