/**
 * @file ClasseRepository.js
 * @description Repository pour gérer les opérations CRUD sur les classes.
 * @module repositories/ClasseRepository
 */

const Classe = require("../models/Classe.js");

/**
 * @typedef {Object} ClasseModel
 * @property {string} _id - ID MongoDB
 * @property {string} nom - Nom de la classe
 * @property {string} prof - ID du professeur associé
 */

class ClasseRepository {
  /**
   * Récupère toutes les classes.
   * @async
   * @returns {Promise<ClasseModel[]>} Liste de toutes les classes
   */
  async getAll() {
    return await Classe.find();
  }

  /**
   * Récupère une classe par son ID.
   * @async
   * @param {string} id - ID MongoDB de la classe
   * @returns {Promise<ClasseModel|null>} Classe trouvée ou null
   */
  async getById(id) {
    return await Classe.findById(id);
  }

  /**
   * Crée une nouvelle classe.
   * @async
   * @param {Object} classeData - Données de la nouvelle classe
   * @param {string} classeData.nom - Nom de la classe
   * @param {string} classeData.prof - ID du professeur associé
   * @returns {Promise<ClasseModel>} Classe créée
   */
  async create(classeData) {
    const classe = new Classe(classeData);
    return await classe.save();
  }

  /**
   * Met à jour une classe existante.
   * @async
   * @param {string} id - ID MongoDB de la classe
   * @param {Object} updateData - Données à mettre à jour
   * @returns {Promise<ClasseModel|null>} Classe mise à jour ou null si non trouvée
   */
  async update(id, updateData) {
    return await Classe.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Supprime une classe par son ID.
   * @async
   * @param {string} id - ID MongoDB de la classe
   * @returns {Promise<ClasseModel|null>} Classe supprimée ou null si non trouvée
   */
  async delete(id) {
    return await Classe.findByIdAndDelete(id);
  }

  /**
   * Récupère une classe par l'ID du professeur associé.
   * @async
   * @param {string} profId - ID MongoDB du professeur
   * @returns {Promise<ClasseModel|null>} Classe trouvée ou null
   */
  async findByProfesseur(profId) {
    return await Classe.findOne({ prof: profId }).populate("prof");
  }
}

module.exports = new ClasseRepository();
