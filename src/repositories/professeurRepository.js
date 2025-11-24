const professeurs = require("../models/Professeur");

exports.findAll = () => professeurs.find();

exports.findById = (id) => professeurs.findById(id);

exports.create = (data) => professeurs.create(data);

exports.update = (id, data) =>
  professeurs.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => professeurs.findByIdAndDelete(id);
