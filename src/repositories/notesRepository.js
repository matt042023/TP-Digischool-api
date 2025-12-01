const notesRepository = require('../models/Notes');

/**
 * Récupère toutes les notes
 * @returns {Promise<Array>} Liste de toutes les notes
 */
exports.findAll = () => {
  return notesRepository.find();
}

/**
 * Récupère une note par son identifiant
 * @param {string} id - Identifiant de la note
 * @returns {Promise<Object>} La note trouvée
 */
exports.findById = (id) => {
  return notesRepository.findById(id);
}

/**
 * Crée une nouvelle note
 * @param {Object} data - Données de la note à créer
 * @returns {Promise<Object>} La note créée
 */
exports.create = (data) => {
  return notesRepository.create(data);
}

/**
 * Met à jour une note existante
 * @param {string} id - Identifiant de la note à modifier
 * @param {Object} data - Nouvelles données de la note
 * @returns {Promise<Object>} La note mise à jour
 */
exports.update = (id, data) => {
  return notesRepository.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Supprime une note
 * @param {string} id - Identifiant de la note à supprimer
 * @returns {Promise<Object>} La note supprimée
 */
exports.delete = (id) => {
  return notesRepository.findByIdAndDelete(id);
}


/**
 * Récupère les notes d'un professeur avec les informations liées
 * @param {string} professeurId - Identifiant du professeur
 * @returns {Promise<Array>} Liste des notes avec les données des élèves, matières, classes, trimestres et professeur
 */
exports.findByProfesseur = (professeurId) => {
  return notesRepository.find({ idProf: professeurId })
    .populate('idEleve', 'nom prenom')
    .populate('idMatiere', 'nom')
    .populate('idClasse', 'nom')
    .populate('idTrimestre', 'nom')
    .populate('idProf', 'nom prenom');
}

/**
 * Récupère les notes par trimestre et classe avec les informations liées
 * @param {string} trimestreId - Identifiant du trimestre
 * @param {string} classeId - Identifiant de la classe
 * @returns {Promise<Array>} Liste des notes avec les données des élèves, matières, classes, trimestres et professeur
 */
exports.findByTrimestreAndClasse = (trimestreId, classeId) => {
  return notesRepository.find({
    idTrimestre: trimestreId,
    idClasse: classeId
  })
    .populate('idEleve', 'nom prenom')
    .populate('idMatiere', 'nom')
    .populate('idClasse', 'nom')
    .populate('idTrimestre', 'nom')
    .populate('idProf', 'nom prenom');
}

exports.findByEleve = (eleveId) => {
  return notesRepository.find({ idEleve: eleveId })
    .populate({
      path: 'idMatiere',     // on populera la matière
      select: 'nom -_id'     // ne récupérer que le nom de la matière, pas l'_id
    })
    .select('idMatiere note avis')  // récupére que ces champs dans Notes
};

