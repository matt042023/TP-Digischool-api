const ClasseService = require("../services/classeService");

class ClasseController {
  // GET /classes
  async getAll(req, res) {
    try {
      const classes = await ClasseService.getAll();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /classes/:id
  async getById(req, res) {
    try {
      const classe = await ClasseService.getById(req.params.id);
      if (!classe) return res.status(404).json({ error: "Classe non trouvée" });
      res.json(classe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /classes
  async create(req, res) {
    try {
      const newClasse = await ClasseService.create(req.body);
      res.status(201).json(newClasse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /classes/:id
  async update(req, res) {
    try {
      const updatedClasse = await ClasseService.update(req.params.id, req.body);
      if (!updatedClasse) return res.status(404).json({ error: "Classe non trouvée" });
      res.json(updatedClasse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /classes/:id
  async delete(req, res) {
    try {
      const deletedClasse = await ClasseService.delete(req.params.id);
      if (!deletedClasse) return res.status(404).json({ error: "Classe non trouvée" });
      res.json({ message: "Classe supprimée" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClasseController();
