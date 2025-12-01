const notesService = require("../services/notesService");

/**
 * Crée une nouvelle note
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {Object} req.body - Corps de la requête contenant les données de la note
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la note créée avec le statut 201 ou une erreur 500
 */
exports.createNote = async (req, res) => {
  try {
    const note = await notesService.createNote(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère toutes les notes
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la liste de toutes les notes ou une erreur 500
 */
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await notesService.getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère une note par son identifiant
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.id - Identifiant de la note
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la note trouvée ou une erreur 500
 */
exports.getNoteById = async (req, res) => {
  try {
    const note = await notesService.getNoteById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Met à jour une note existante
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.id - Identifiant de la note à modifier
 * @param {Object} req.body - Corps de la requête contenant les nouvelles données
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la note mise à jour ou une erreur 500
 */
exports.updateNote = async (req, res) => {
  try {
    const note = await notesService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Supprime une note
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.id - Identifiant de la note à supprimer
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie un message de confirmation ou une erreur 500
 */
exports.deleteNote = async (req, res) => {
  try {
    await notesService.deleteNote(req.params.id);
    res.json({ message: "Note supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * Récupère les notes d'un professeur avec les informations des élèves
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.professeurId - Identifiant du professeur
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la liste des notes du professeur ou une erreur 400
 */
exports.getNotesByProfesseur = async (req, res) => {
  try {
    const notes = await notesService.getNotesByProfesseur(req.params.professeurId);
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Récupère les notes par trimestre et classe avec les informations des élèves, matières et professeurs
 * @async
 * @param {Object} req - Objet de requête Express
 * @param {string} req.params.idTrimestre - Identifiant du trimestre
 * @param {string} req.params.idClasse - Identifiant de la classe
 * @param {Object} res - Objet de réponse Express
 * @returns {Promise<void>} Renvoie la liste des notes filtrées ou une erreur 400
 */
exports.getNotesByTrimestreAndClasse = async (req, res) => {
  try {
    const { idTrimestre, idClasse } = req.params;
    const notes = await notesService.getNotesByTrimestreAndClasse(idTrimestre, idClasse);
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
exports.getNotesByEleve = async (req, res) => {
  try {
    const notes = await notesService.getNotesByEleve(req.params.eleveId);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "Aucune note trouvée pour cet élève" });
    }
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
