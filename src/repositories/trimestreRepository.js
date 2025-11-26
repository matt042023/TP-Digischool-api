const trimestreRepository = require('../models/Trimestre');

exports.findAll = () => {
  return trimestreRepository.find();
}

exports.findById = (id) => {
  return trimestreRepository.findById(id);
}

exports.create = (data) => {
  return trimestreRepository.create(data);
}

exports.update = (id, data) => {
  return trimestreRepository.findByIdAndUpdate(id, data, { new: true });
}

exports.delete = (id) => {
  return trimestreRepository.findByIdAndDelete(id);
}