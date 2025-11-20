const professeurService = require("../services/professeurService");

exports.getAll = (req, res) => {
  const data = professeurService.getAll();
  res.json(data);
};

exports.getOne = (req, res) => {
  try {
    const prof = professeurService.getOne(req.params.id);
    res.json(prof);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.create = (req, res) => {
  try {
    const prof = professeurService.create(req.body);
    res.status(201).json(prof);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = (req, res) => {
  try {
    const prof = professeurService.update(req.params.id, req.body);
    res.json(prof);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.remove = (req, res) => {
  try {
    professeurService.remove(req.params.id);
    res.json({ message: "Professeur supprimé avec succès" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
