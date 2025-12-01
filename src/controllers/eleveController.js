/**
 * @fileoverview Contrôleur pour la gestion des endpoints API des élèves
 * @module controllers/eleveController
 */

const eleveService = require("../services/eleveService");

/**
 * Récupère tous les élèves
 * @async
 * @function getAll
 * @param {Object} req - Objet requête Express
 * @param {Object} req.query - Paramètres de requête
 * @param {string} [req.query.groupByClasse] - Si 'true', regroupe les élèves par classe
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint GET pour récupérer tous les élèves.
 * Supporte le paramètre query 'groupByClasse=true' pour obtenir les élèves regroupés par classe
 * @example
 * // Requête simple
 * GET /eleves
 * // Requête avec regroupement
 * GET /eleves?groupByClasse=true
 */
exports.getAll = async (req, res) => {
  try {
    const groupByClasse = req.query.groupByClasse === 'true';
    const data = await eleveService.getAll(groupByClasse);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Récupère un élève par son ID
 * @async
 * @function getOne
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.id - ID de l'élève
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint GET pour récupérer un élève spécifique par son ID
 * @example
 * GET /eleves/507f1f77bcf86cd799439011
 */
exports.getOne = async (req, res) => {
  try {
    const eleve = await eleveService.getById(req.params.id);
    res.json(eleve);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

/**
 * Récupère tous les élèves d'une classe spécifique
 * @async
 * @function getByClasse
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.classeId - ID de la classe
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint GET pour récupérer tous les élèves appartenant à une classe donnée
 * @example
 * GET /eleves/classe/507f1f77bcf86cd799439011
 */
exports.getByClasse = async (req, res) => {
  try {
    const data = await eleveService.getByClasse(req.params.classeId);

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun élève trouvé pour cette classe" });
    }

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Crée un nouvel élève
 * @async
 * @function create
 * @param {Object} req - Objet requête Express
 * @param {Object} req.body - Corps de la requête contenant les données de l'élève
 * @param {string} req.body.nom - Nom de l'élève (obligatoire)
 * @param {string} [req.body.prenom] - Prénom de l'élève
 * @param {string} req.body.classe - ID de la classe (obligatoire)
 * @param {string} req.body.sexe - Sexe de l'élève: HOMME ou FEMME (obligatoire)
 * @param {Date} [req.body.date_naissance] - Date de naissance
 * @param {string} [req.body.adresse] - Adresse de l'élève
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint POST pour créer un nouvel élève
 * @example
 * POST /eleves
 * Body: { "nom": "Dupont", "prenom": "Jean", "classe": "507f...", "sexe": "HOMME" }
 */
exports.create = async (req, res) => {
  try {
    const eleve = await eleveService.create(req.body);
    res.status(201).json(eleve);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/**
 * Met à jour un élève existant
 * @async
 * @function update
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.id - ID de l'élève à mettre à jour
 * @param {Object} req.body - Corps de la requête contenant les nouvelles données
 * @param {string} [req.body.nom] - Nouveau nom
 * @param {string} [req.body.prenom] - Nouveau prénom
 * @param {string} [req.body.classe] - Nouvel ID de classe
 * @param {string} [req.body.sexe] - Nouveau sexe
 * @param {Date} [req.body.date_naissance] - Nouvelle date de naissance
 * @param {string} [req.body.adresse] - Nouvelle adresse
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint PUT pour mettre à jour un élève existant
 * @example
 * PUT /eleves/507f1f77bcf86cd799439011
 * Body: { "nom": "Martin" }
 */
exports.update = async (req, res) => {
  try {
    const eleve = await eleveService.update(req.params.id, req.body);
    res.json(eleve);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

/**
 * Supprime un élève
 * @async
 * @function remove
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.id - ID de l'élève à supprimer
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint DELETE pour supprimer un élève de la base de données
 * @example
 * DELETE /eleves/507f1f77bcf86cd799439011
 */
exports.remove = async (req, res) => {
  try {
    await eleveService.delete(req.params.id);
    res.json({ message: "Élève supprimé avec succès" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
