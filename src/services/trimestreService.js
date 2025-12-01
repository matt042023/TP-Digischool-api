const trimestreRepository = require("../repositories/trimestreRepository");

/**
 * Récupère tous les trimestres
 * @returns {Promise<Array>} Liste de tous les trimestres
 */
exports.getAllTrimestres = () => {
  return trimestreRepository.findAll();
};

/**
 * Récupère un trimestre par son identifiant
 * @param {string} id - Identifiant du trimestre
 * @returns {Promise<Object>} Le trimestre trouvé
 */
exports.getTrimestreById = (id) => {
  return trimestreRepository.findById(id);
};

/**
 * Crée un nouveau trimestre avec validation
 * @param {Object} data - Données du trimestre à créer
 * @param {string} data.nom - Nom du trimestre (obligatoire)
 * @param {Date} data.date - Date du trimestre (obligatoire)
 * @returns {Promise<Object>} Le trimestre créé
 * @throws {Error} Si la date ou le nom sont manquants
 */
exports.createTrimestre = (data) => {
  if (!data.date || !data.nom) {
    throw new Error('La date et/ou le nom sont obligatoires');
  }
  return trimestreRepository.create(data);
};

/**
 * Met à jour un trimestre existant avec validation
 * @param {string} id - Identifiant du trimestre à modifier
 * @param {Object} data - Nouvelles données du trimestre
 * @param {string} data.nom - Nouveau nom du trimestre (obligatoire)
 * @param {Date} data.date - Nouvelle date du trimestre (obligatoire)
 * @returns {Promise<Object>} Le trimestre mis à jour
 * @throws {Error} Si la date ou le nom sont manquants
 */
exports.updateTrimestre = (id, data) => {
  if (!data.date || !data.nom) {
    throw new Error('La date et/ou le nom sont obligatoires');
  }
  return trimestreRepository.update(id, data);
};

/**
 * Supprime un trimestre
 * @param {string} id - Identifiant du trimestre à supprimer
 * @returns {Promise<Object>} Le trimestre supprimé
 */
exports.deleteTrimestre = (id) => {
  return trimestreRepository.delete(id);
};