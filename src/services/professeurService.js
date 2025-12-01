/**
 * @fileoverview Service métier pour la gestion des professeurs
 * @module services/professeurService
 */

const ProfesseurRepository = require("../repositories/professeurRepository");
const ClasseRepository = require("../repositories/classeRepository");

/**
 * Service de gestion des professeurs
 * @class ProfesseurService
 * @description Couche métier pour gérer les opérations sur les professeurs,
 * incluant la validation et la logique métier
 */
class ProfesseurService {
  /**
   * Récupère tous les professeurs, avec option de filtrage par classe
   * @param {string|null} [classeId=null] - ID de la classe pour filtrer le professeur associé
   * @returns {Promise<Array>} Liste des professeurs ou tableau contenant le professeur de la classe
   * @throws {Error} Si la classe spécifiée n'existe pas
   * @description Si classeId est fourni, retourne uniquement le professeur associé à cette classe.
   * Sinon, retourne tous les professeurs.
   */
  async getAll(classeId = null) {
    if (classeId) {
      const classe = await ClasseRepository.getById(classeId);
      if (!classe) {
        throw new Error("Classe introuvable");
      }
      const professeur = await ProfesseurRepository.findById(classe.prof);
      return professeur ? [professeur] : [];
    }
    return await ProfesseurRepository.findAll();
  }

  /**
   * Récupère un professeur par son ID
   * @param {string} id - ID du professeur à récupérer
   * @returns {Promise<Object>} Le professeur trouvé
   * @throws {Error} Si le professeur n'est pas trouvé
   */
  async getById(id) {
    const prof = await ProfesseurRepository.findById(id);
    if (!prof) {
      throw new Error("Professeur introuvable");
    }
    return prof;
  }

  /**
   * Crée un nouveau professeur
   * @param {Object} data - Données du professeur à créer
   * @param {string} data.nom - Nom du professeur (obligatoire)
   * @param {string} [data.prenom] - Prénom du professeur
   * @param {string} data.sexe - Sexe du professeur: HOMME ou FEMME (obligatoire)
   * @param {Date} [data.date_naissance] - Date de naissance
   * @param {string} [data.adresse] - Adresse du professeur
   * @returns {Promise<Object>} Le professeur créé
   * @throws {Error} Si les champs obligatoires (nom, sexe) sont manquants
   */
  async create(data) {
    if (!data.nom || !data.sexe) {
      throw new Error("Les champs 'nom' et 'sexe' sont obligatoires");
    }
    return await ProfesseurRepository.create(data);
  }

  /**
   * Met à jour un professeur existant
   * @param {string} id - ID du professeur à mettre à jour
   * @param {Object} data - Nouvelles données du professeur
   * @param {string} [data.nom] - Nouveau nom
   * @param {string} [data.prenom] - Nouveau prénom
   * @param {string} [data.sexe] - Nouveau sexe
   * @param {Date} [data.date_naissance] - Nouvelle date de naissance
   * @param {string} [data.adresse] - Nouvelle adresse
   * @returns {Promise<Object>} Le professeur mis à jour
   * @throws {Error} Si le professeur n'existe pas ou si la mise à jour échoue
   */
  async update(id, data) {
    const updated = await ProfesseurRepository.update(id, data);
    if (!updated) {
      throw new Error("Impossible de mettre à jour ce professeur");
    }
    return updated;
  }

  /**
   * Supprime un professeur
   * @param {string} id - ID du professeur à supprimer
   * @returns {Promise<Object>} Le professeur supprimé
   * @throws {Error} Si le professeur n'existe pas ou si la suppression échoue
   */
  async delete(id) {
    const deleted = await ProfesseurRepository.remove(id);
    if (!deleted) {
      throw new Error("Impossible de supprimer ce professeur");
    }
    return deleted;
  }
}

/**
 * Instance singleton du service Professeur
 * @type {ProfesseurService}
 */
module.exports = new ProfesseurService();
