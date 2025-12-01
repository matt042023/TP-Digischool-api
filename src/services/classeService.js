const ClasseRepository = require("../repositories/classeRepository");

/**
 * Service pour gérer les opérations sur les classes.
 * Interagit avec le ClasseRepository pour effectuer les opérations CRUD.
 * @module services/ClasseService
 */

/**
 * @typedef {object} ClasseData
 * @property {string} nom - Nom de la classe
 * @property {string} prof - ID du professeur associé
 */

class ClasseService {
  /**
   * Récupère toutes les classes.
   * @async
   * @function getAll
   * @returns {Promise<Object[]>} Liste de toutes les classes
   */
  async getAll() {
    return await ClasseRepository.getAll();
  }

  /**
   * Récupère une classe par son ID.
   * @async
   * @function getById
   * @param {string} id - ID MongoDB de la classe
   * @returns {Promise<Object|null>} Classe trouvée ou null si non trouvée
   */
  async getById(id) {
    return await ClasseRepository.getById(id);
  }

  /**
   * Crée une nouvelle classe.
   * @async
   * @function create
   * @param {ClasseData} classeData - Données de la nouvelle classe
   * @returns {Promise<Object>} Classe créée
   */
  async create(classeData) {
    return await ClasseRepository.create(classeData);
  }

  /**
   * Met à jour une classe existante.
   * @async
   * @function update
   * @param {string} id - ID MongoDB de la classe
   * @param {Object} updateData - Données à mettre à jour
   * @returns {Promise<Object|null>} Classe mise à jour ou null si non trouvée
   */
  async update(id, updateData) {
    return await ClasseRepository.update(id, updateData);
  }

  /**
   * Supprime une classe par son ID.
   * @async
   * @function delete
   * @param {string} id - ID MongoDB de la classe
   * @returns {Promise<Object|null>} Classe supprimée ou null si non trouvée
   */
  async delete(id) {
    return await ClasseRepository.delete(id);
  }
}

module.exports = new ClasseService();
