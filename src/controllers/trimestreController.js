const trimestreService = require("../services/trimestreService");

const trimestreController = {

  createTrimestre: async (req, res) => {
    try {
      const trimestre = await trimestreService.createTrimestre(req.body);
      res.status(201).json(trimestre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllTrimestres: async (req, res) => {
    try {
      const trimestres = await trimestreService.getAllTrimestres();
      res.json(trimestres);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTrimestreById: async (req, res) => {
    try {
      const trimestre = await trimestreService.getTrimestreById(req.params.id);
      res.json(trimestre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateTrimestre: async (req, res) => {
    try {
      const trimestre = await trimestreService.updateTrimestre(req.params.id, req.body);
      res.json(trimestre);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteTrimestre: async (req, res) => {
    try {
      await trimestreService.deleteTrimestre(req.params.id);
      res.json({ message: "Trimestre supprimé" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

module.exports = trimestreController;
