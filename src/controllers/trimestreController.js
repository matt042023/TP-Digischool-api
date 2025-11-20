const trimestreService = require("../services/trimestreService");

exports.createTrimestre = (req, res) => {
  try {
    const trimestre = trimestreService.createTrimestre(req.body);
    res.status(201).json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTrimestres = (req, res) => {
  try {
    const trimestres = trimestreService.getAllTrimestres();
    res.json(trimestres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrimestreById = (req, res) => {
  try {
    const trimestre = trimestreService.getTrimestreById(req.params.id);
    res.json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrimestre = (req, res) => {
  try {
    const trimestre = trimestreService.updateTrimestre(req.params.id, req.body);
    res.json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrimestre = (req, res) => {
  try {
    trimestreService.deleteTrimestre(req.params.id);
    res.json({ message: "Trimestre supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

