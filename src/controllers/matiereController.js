/**
 * @file MatiereController.js
 * @description Controller gérant les opérations CRUD liées aux matières.
 * @module controllers/MatiereController
 */

const MatiereService = require("../services/matiereService");

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
 * Controller pour les matières.
 */
class MatiereController {
  /**
   * Récupère toutes les matières.
   * @async
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route GET /matieres
   */
  async getAll(req, res) {
    try {
      const matieres = await MatiereService.getAll();
      res.json(matieres);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Récupère une matière par son ID.
   * @async
   * @param {Request} req - Requête Express (params.id)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route GET /matieres/:id
   */
  async getById(req, res) {
    try {
      const matiere = await MatiereService.getById(req.params.id);
      if (!matiere) return res.status(404).json({ error: "Matière non trouvée" });
      res.json(matiere);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Crée une nouvelle matière.
   * @async
   * @param {Request} req - Requête Express (body)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route POST /matieres
   */
  async create(req, res) {
    try {
      const newMatiere = await MatiereService.create(req.body);
      res.status(201).json(newMatiere);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Met à jour une matière via son ID.
   * @async
   * @param {Request} req - Requête Express (params.id + body)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route PUT /matieres/:id
   */
  async update(req, res) {
    try {
      const updatedMatiere = await MatiereService.update(req.params.id, req.body);
      if (!updatedMatiere) return res.status(404).json({ error: "Matière non trouvée" });
      res.json(updatedMatiere);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Supprime une matière via son ID.
   * @async
   * @param {Request} req - Requête Express (params.id)
   * @param {Response} res - Réponse Express
   * @returns {Promise<void>}
   * @route DELETE /matieres/:id
   */
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
