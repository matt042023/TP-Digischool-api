/**
 * @file ClasseController.js
 * @description Controller gérant les opérations CRUD pour les classes.
 * @module controllers/ClasseController
 */

const ClasseService = require("../services/classeService");

/**
 * @typedef {Object} Request
 * @property {Object} params
 * @property {Object} body
 */

/**
 * @typedef {Object} Response
 * @property {function(Object): void} json
 * @property {function(number, Object): void} status
 */

/**
 * Controller pour les classes.
 */
class ClasseController {
  /**
   * Récupère toutes les classes.
   * @async
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route GET /classes
   */
  async getAll(req, res) {
    try {
      const classes = await ClasseService.getAll();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Récupère une classe par son ID.
   * @async
   * @param {Request} req - Requête Express (params.id)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route GET /classes/:id
   */
  async getById(req, res) {
    try {
      const classe = await ClasseService.getById(req.params.id);
      if (!classe) return res.status(404).json({ error: "Classe non trouvée" });
      res.json(classe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Crée une nouvelle classe.
   * @async
   * @param {Request} req - Corps de la requête (req.body)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route POST /classes
   */
  async create(req, res) {
    try {
      const newClasse = await ClasseService.create(req.body);
      res.status(201).json(newClasse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Met à jour une classe existante via son ID.
   * @async
   * @param {Request} req - Requête Express (params.id + body)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route PUT /classes/:id
   */
  async update(req, res) {
    try {
      const updatedClasse = await ClasseService.update(req.params.id, req.body);
      if (!updatedClasse) return res.status(404).json({ error: "Classe non trouvée" });
      res.json(updatedClasse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Supprime une classe via son ID.
   * @async
   * @param {Request} req - Requête Express (params.id)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route DELETE /classes/:id
   */
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
