/**
 * @fileoverview Service métier pour la gestion des élèves
 * @module services/eleveService
 */

const EleveRepository = require("../repositories/eleveRepository");

/**
 * Service de gestion des élèves
 * @class EleveService
 * @description Couche métier pour gérer les opérations sur les élèves,
 * incluant la validation et la logique métier
 */
class EleveService {
  /**
   * Récupère tous les élèves, avec option de regroupement par classe
   * @param {boolean} [groupByClasse=false] - Si true, regroupe les élèves par classe
   * @returns {Promise<Array>} Liste des élèves ou liste groupée par classe
   * @description Si groupByClasse est true, retourne les élèves regroupés avec statistiques par classe
   */
  async getAll(groupByClasse = false) {
    if (groupByClasse) {
      return await EleveRepository.findAllGroupedByClasse();
    }
    return await EleveRepository.findAll();
  }

  /**
   * Récupère un élève par son ID
   * @param {string} id - ID de l'élève à récupérer
   * @returns {Promise<Object>} L'élève trouvé
   * @throws {Error} Si l'élève n'est pas trouvé
   */
  async getById(id) {
    const eleve = await EleveRepository.findById(id);
    if (!eleve) {
      throw new Error("Élève introuvable");
    }
    return eleve;
  }

  /**
   * Crée un nouvel élève
   * @param {Object} data - Données de l'élève à créer
   * @param {string} data.nom - Nom de l'élève (obligatoire)
   * @param {string} [data.prenom] - Prénom de l'élève
   * @param {string} data.classe - ID de la classe (obligatoire)
   * @param {string} data.sexe - Sexe de l'élève: HOMME ou FEMME (obligatoire)
   * @param {Date} [data.date_naissance] - Date de naissance
   * @param {string} [data.adresse] - Adresse de l'élève
   * @returns {Promise<Object>} L'élève créé
   * @throws {Error} Si les champs obligatoires (nom, sexe, classe) sont manquants
   */
  async create(data) {
    if (!data.nom || !data.sexe || !data.classe) {
      throw new Error("Les champs 'nom', 'sexe' et 'classe' sont obligatoires");
    }
    return await EleveRepository.create(data);
  }

  /**
   * Met à jour un élève existant
   * @param {string} id - ID de l'élève à mettre à jour
   * @param {Object} data - Nouvelles données de l'élève
   * @param {string} [data.nom] - Nouveau nom
   * @param {string} [data.prenom] - Nouveau prénom
   * @param {string} [data.classe] - Nouvel ID de classe
   * @param {string} [data.sexe] - Nouveau sexe
   * @param {Date} [data.date_naissance] - Nouvelle date de naissance
   * @param {string} [data.adresse] - Nouvelle adresse
   * @returns {Promise<Object>} L'élève mis à jour
   * @throws {Error} Si l'élève n'existe pas ou si la mise à jour échoue
   */
  async update(id, data) {
    const updated = await EleveRepository.update(id, data);
    if (!updated) {
      throw new Error("Impossible de mettre à jour cet élève");
    }
    return updated;
  }

  /**
   * Supprime un élève
   * @param {string} id - ID de l'élève à supprimer
   * @returns {Promise<Object>} L'élève supprimé
   * @throws {Error} Si l'élève n'existe pas ou si la suppression échoue
   */
  async delete(id) {
    const deleted = await EleveRepository.remove(id);
    if (!deleted) {
      throw new Error("Impossible de supprimer cet élève");
    }
    return deleted;
  }

  /**
   * Récupère tous les élèves d'une classe spécifique
   * @param {string} classeId - ID de la classe
   * @returns {Promise<Array>} Liste des élèves de la classe (peut être vide)
   * @description Retourne un tableau vide si aucun élève n'est trouvé (pas d'exception)
   */
  async getByClasse(classeId) {
  const result = await EleveRepository.findByClasse(classeId);
  return result; // tableau vide possible -> pas d'exception
}

}

/**
 * Instance singleton du service Eleve
 * @type {EleveService}
 */
module.exports = new EleveService();
