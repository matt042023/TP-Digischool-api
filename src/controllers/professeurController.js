const professeurService = require("../services/professeurService");

exports.getAll = async (req, res) => {
  try {
    const data = await professeurService.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const prof = await professeurService.getById(req.params.id);
    res.json(prof);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const prof = await professeurService.create(req.body);
    res.status(201).json(prof);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const prof = await professeurService.update(req.params.id, req.body);
    res.json(prof);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await professeurService.delete(req.params.id);
    res.json({ message: "Professeur supprimé avec succès" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
