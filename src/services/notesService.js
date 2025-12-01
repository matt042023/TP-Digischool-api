const notesRepository = require('../repositories/notesRepository');

/**
 * Récupère toutes les notes
 * @returns {Promise<Array>} Liste de toutes les notes
 */
exports.getAllNotes = () => {
  return notesRepository.findAll();
};

/**
 * Récupère une note par son identifiant
 * @param {string} id - Identifiant de la note
 * @returns {Promise<Object>} La note trouvée
 */
exports.getNoteById = (id) => {
  return notesRepository.findById(id);
};

/**
 * Crée une nouvelle note avec validation
 * @param {Object} data - Données de la note à créer
 * @param {number} data.note - Valeur de la note (doit être entre 0 et 20)
 * @returns {Promise<Object>} La note créée
 * @throws {Error} Si la note n'est pas comprise entre 0 et 20
 */
exports.createNote = (data) => {
  if (data.note && (data.note < 0 || data.note > 20)) {
    throw new Error('La note doit être comprise entre 0 et 20');
  }
  return notesRepository.create(data);
};

/**
 * Met à jour une note existante avec validation
 * @param {string} id - Identifiant de la note à modifier
 * @param {Object} data - Nouvelles données de la note
 * @param {number} [data.note] - Nouvelle valeur de la note (doit être entre 0 et 20)
 * @returns {Promise<Object>} La note mise à jour
 * @throws {Error} Si la note n'est pas comprise entre 0 et 20
 */
exports.updateNote = (id, data) => {
  if (data.note && (data.note < 0 || data.note > 20)) {
    throw new Error('La note doit être comprise entre 0 et 20');
  }
  return notesRepository.update(id, data);
};

/**
 * Supprime une note
 * @param {string} id - Identifiant de la note à supprimer
 * @returns {Promise<Object>} La note supprimée
 */
exports.deleteNote = (id) => {
  return notesRepository.delete(id);
};


/**
 * Récupère les notes d'un professeur avec les informations liées
 * @param {string} professeurId - Identifiant du professeur
 * @returns {Promise<Array>} Liste des notes avec les données des élèves, matières, classes, trimestres et professeur
 */
exports.getNotesByProfesseur = (professeurId) => {
  return notesRepository.findByProfesseur(professeurId);
};

/**
 * Récupère les notes par trimestre et classe avec les informations liées
 * @param {string} trimestreId - Identifiant du trimestre
 * @param {string} classeId - Identifiant de la classe
 * @returns {Promise<Array>} Liste des notes avec les données des élèves, matières, classes, trimestres et professeur
 */
exports.getNotesByTrimestreAndClasse = (trimestreId, classeId) => {
  return notesRepository.findByTrimestreAndClasse(trimestreId, classeId);
};

exports.getNotesByEleve = (eleveId) => {
  return notesRepository.findByEleve(eleveId);
};

