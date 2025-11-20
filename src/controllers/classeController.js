const ClasseService = require("../services/classeService.js");

class ClasseController {
  getAll(req, res) {
    try {
      const classes = ClasseService.getAllClasses();
      res.json(classes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const classe = ClasseService.getClasseById(id);
      res.json(classe);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  create(req, res) {
    try {
      const newClasse = ClasseService.createClasse(req.body);
      res.status(201).json(newClasse);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updatedClasse = ClasseService.updateClasse(id, req.body);
      res.json(updatedClasse);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const deletedClasse = ClasseService.deleteClasse(id);
      res.json(deletedClasse);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new ClasseController();
