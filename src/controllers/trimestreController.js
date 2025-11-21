const trimestreService = require("../services/trimestreService");

exports.createTrimestre = async (req, res) => {
  try {
    const trimestre = await trimestreService.createTrimestre(req.body);
    res.status(201).json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTrimestres = async (req, res) => {
  try {
    const trimestres = await trimestreService.getAllTrimestres();
    res.json(trimestres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrimestreById = async (req, res) => {
  try {
    const trimestre = await trimestreService.getTrimestreById(req.params.id);
    res.json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrimestre = async (req, res) => {
  try {
    const trimestre = await trimestreService.updateTrimestre(req.params.id, req.body);
    res.json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrimestre = async (req, res) => {
  try {
    await trimestreService.deleteTrimestre(req.params.id);
    res.json({ message: "Trimestre supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

