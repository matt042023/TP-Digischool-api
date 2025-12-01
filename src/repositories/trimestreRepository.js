const trimestreRepository = require('../models/Trimestre');

/**
 * Récupère tous les trimestres
 * @returns {Promise<Array>} Liste de tous les trimestres
 */
exports.findAll = () => {
  return trimestreRepository.find();
}

/**
 * Récupère un trimestre par son identifiant
 * @param {string} id - Identifiant du trimestre
 * @returns {Promise<Object>} Le trimestre trouvé
 */
exports.findById = (id) => {
  return trimestreRepository.findById(id);
}

/**
 * Crée un nouveau trimestre
 * @param {Object} data - Données du trimestre à créer
 * @returns {Promise<Object>} Le trimestre créé
 */
exports.create = (data) => {
  return trimestreRepository.create(data);
}

/**
 * Met à jour un trimestre existant
 * @param {string} id - Identifiant du trimestre à modifier
 * @param {Object} data - Nouvelles données du trimestre
 * @returns {Promise<Object>} Le trimestre mis à jour
 */
exports.update = (id, data) => {
  return trimestreRepository.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Supprime un trimestre
 * @param {string} id - Identifiant du trimestre à supprimer
 * @returns {Promise<Object>} Le trimestre supprimé
 */
exports.delete = (id) => {
  return trimestreRepository.findByIdAndDelete(id);
}