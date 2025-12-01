const trimestreService = require("../services/trimestreService");

/**
 * Crée un nouveau trimestre
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {Object} req.body - Corps de la requête contenant les données du trimestre
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie le trimestre créé avec le statut 201 ou une erreur 500
 */
exports.createTrimestre = async (req, res) => {
  try {
    const trimestre = await trimestreService.createTrimestre(req.body);
    res.status(201).json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère tous les trimestres
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la liste de tous les trimestres ou une erreur 500
 */
exports.getAllTrimestres = async (req, res) => {
  try {
    const trimestres = await trimestreService.getAllTrimestres();
    res.json(trimestres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère un trimestre par son identifiant
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.id - Identifiant du trimestre
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie le trimestre trouvé ou une erreur 500
 */
exports.getTrimestreById = async (req, res) => {
  try {
    const trimestre = await trimestreService.getTrimestreById(req.params.id);
    res.json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Met à jour un trimestre existant
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.id - Identifiant du trimestre à modifier
 * @param {Object} req.body - Corps de la requête contenant les nouvelles données
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie le trimestre mis à jour ou une erreur 500
 */
exports.updateTrimestre = async (req, res) => {
  try {
    const trimestre = await trimestreService.updateTrimestre(req.params.id, req.body);
    res.json(trimestre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Supprime un trimestre
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.id - Identifiant du trimestre à supprimer
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie un message de confirmation ou une erreur 500
 */
exports.deleteTrimestre = async (req, res) => {
  try {
    await trimestreService.deleteTrimestre(req.params.id);
    res.json({ message: "Trimestre supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

