const MatiereService = require("../services/matiereService.js");

class MatiereController {
  getAll(req, res) {
    try {
      const matieres = MatiereService.getAllMatieres();
      res.json(matieres);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const matiere = MatiereService.getMatiereById(id);
      res.json(matiere);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  create(req, res) {
    try {
      const newMatiere = MatiereService.createMatiere(req.body);
      res.status(201).json(newMatiere);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updatedMatiere = MatiereService.updateMatiere(id, req.body);
      res.json(updatedMatiere);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const deletedMatiere = MatiereService.deleteMatiere(id);
      res.json(deletedMatiere);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new MatiereController();
