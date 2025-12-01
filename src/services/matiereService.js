const MatiereRepository = require("../repositories/matiereRepository");

/**
 * Service pour gérer les opérations sur les matières.
 * Interagit avec le MatiereRepository pour effectuer les opérations CRUD.
 * @module services/MatiereService
 */

/**
 * @typedef {object} MatiereData
 * @property {string} nom - Nom de la matière
 */

class MatiereService {
  /**
   * Récupère toutes les matières.
   * @async
   * @function getAll
   * @returns {Promise<Object[]>} Liste de toutes les matières
   */
  async getAll() {
    return await MatiereRepository.getAll();
  }

  /**
   * Récupère une matière par son ID.
   * @async
   * @function getById
   * @param {string} id - ID MongoDB de la matière
   * @returns {Promise<Object|null>} Matière trouvée ou null si non trouvée
   */
  async getById(id) {
    return await MatiereRepository.getById(id);
  }

  /**
   * Crée une nouvelle matière.
   * @async
   * @function create
   * @param {MatiereData} matiereData - Données de la nouvelle matière
   * @returns {Promise<Object>} Matière créée
   */
  async create(matiereData) {
    return await MatiereRepository.create(matiereData);
  }

  /**
   * Met à jour une matière existante.
   * @async
   * @function update
   * @param {string} id - ID MongoDB de la matière
   * @param {Object} updateData - Données à mettre à jour
   * @returns {Promise<Object|null>} Matière mise à jour ou null si non trouvée
   */
  async update(id, updateData) {
    return await MatiereRepository.update(id, updateData);
  }

  /**
   * Supprime une matière par son ID.
   * @async
   * @function delete
   * @param {string} id - ID MongoDB de la matière
   * @returns {Promise<Object|null>} Matière supprimée ou null si non trouvée
   */
  async delete(id) {
    return await MatiereRepository.delete(id);
  }
}

module.exports = new MatiereService();
