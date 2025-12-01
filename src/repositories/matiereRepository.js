/**
 * @file MatiereRepository.js
 * @description Repository pour gérer les opérations CRUD sur les matières.
 * @module repositories/MatiereRepository
 */

const Matiere = require("../models/Matiere.js");

/**
 * @typedef {Object} MatiereModel
 * @property {string} _id - ID MongoDB
 * @property {string} nom - Nom de la matière
 */

class MatiereRepository {
  /**
   * Récupère toutes les matières.
   * @async
   * @returns {Promise<MatiereModel[]>} Liste de toutes les matières
   */
  async getAll() {
    return await Matiere.find();
  }

  /**
   * Récupère une matière par son ID.
   * @async
   * @param {string} id - ID MongoDB de la matière
   * @returns {Promise<MatiereModel|null>} Matière trouvée ou null
   */
  async getById(id) {
    return await Matiere.findById(id);
  }

  /**
   * Crée une nouvelle matière.
   * @async
   * @param {Object} matiereData - Données de la nouvelle matière
   * @param {string} matiereData.nom - Nom de la matière
   * @returns {Promise<MatiereModel>} Matière créée
   */
  async create(matiereData) {
    const matiere = new Matiere(matiereData);
    return await matiere.save();
  }

  /**
   * Met à jour une matière existante.
   * @async
   * @param {string} id - ID MongoDB de la matière
   * @param {Object} updateData - Données à mettre à jour
   * @returns {Promise<MatiereModel|null>} Matière mise à jour ou null si non trouvée
   */
  async update(id, updateData) {
    return await Matiere.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Supprime une matière par son ID.
   * @async
   * @param {string} id - ID MongoDB de la matière
   * @returns {Promise<MatiereModel|null>} Matière supprimée ou null si non trouvée
   */
  async delete(id) {
    return await Matiere.findByIdAndDelete(id);
  }
}

module.exports = new MatiereRepository();
