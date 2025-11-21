const eleves = require("../models/Eleve");

exports.findAll = () => eleves.find().populate("classe");

exports.findById = (id) => eleves.findById(id).populate("classe");

exports.create = (data) => eleves.create(data);

exports.update = (id, data) =>
  eleves.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => eleves.findByIdAndDelete(id);
