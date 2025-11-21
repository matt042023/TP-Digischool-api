const MatiereService = require("../services/matiereService");

class MatiereController {
  async getAll(req, res) {
    try {
      const matieres = await MatiereService.getAll();
      res.json(matieres);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const matiere = await MatiereService.getById(req.params.id);
      if (!matiere) return res.status(404).json({ error: "Matière non trouvée" });
      res.json(matiere);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newMatiere = await MatiereService.create(req.body);
      res.status(201).json(newMatiere);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedMatiere = await MatiereService.update(req.params.id, req.body);
      if (!updatedMatiere) return res.status(404).json({ error: "Matière non trouvée" });
      res.json(updatedMatiere);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedMatiere = await MatiereService.delete(req.params.id);
      if (!deletedMatiere) return res.status(404).json({ error: "Matière non trouvée" });
      res.json({ message: "Matière supprimée" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MatiereController();
