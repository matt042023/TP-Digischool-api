const eleveService = require("../services/eleveService");

exports.getAll = (req, res) => {
  const data = eleveService.getAll();
  res.json(data);
};

exports.getOne = (req, res) => {
  try {
    const eleve = eleveService.getOne(req.params.id);
    res.json(eleve);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.create = (req, res) => {
  try {
    const eleve = eleveService.create(req.body);
    res.status(201).json(eleve);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = (req, res) => {
  try {
    const eleve = eleveService.update(req.params.id, req.body);
    res.json(eleve);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.remove = (req, res) => {
  try {
    eleveService.remove(req.params.id);
    res.json({ message: "Élève supprimé avec succès" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
