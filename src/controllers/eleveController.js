const eleveService = require("../services/eleveService");

exports.getAll = async (req, res) => {
  try {
    const data = await eleveService.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const eleve = await eleveService.getById(req.params.id);
    res.json(eleve);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getByClasse = async (req, res) => {
  try {
    const data = await eleveService.getByClasse(req.params.classeId);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun élève trouvé pour cette classe" });
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const eleve = await eleveService.create(req.body);
    res.status(201).json(eleve);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const eleve = await eleveService.update(req.params.id, req.body);
    res.json(eleve);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await eleveService.delete(req.params.id);
    res.json({ message: "Élève supprimé avec succès" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
