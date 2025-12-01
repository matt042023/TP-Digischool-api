/**
 * @fileoverview Contrôleur pour la gestion des endpoints API des professeurs
 * @module controllers/professeurController
 */

const professeurService = require("../services/professeurService");

/**
 * Récupère tous les professeurs
 * @async
 * @function getAll
 * @param {Object} req - Objet requête Express
 * @param {Object} req.query - Paramètres de requête
 * @param {string} [req.query.classe] - ID de la classe pour filtrer le professeur associé
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint GET pour récupérer tous les professeurs.
 * Supporte le paramètre query 'classe' pour obtenir le professeur d'une classe spécifique
 * @example
 * // Requête simple
 * GET /professeurs
 * // Requête avec filtrage par classe
 * GET /professeurs?classe=507f1f77bcf86cd799439011
 */
exports.getAll = async (req, res) => {
  try {
    const { classe } = req.query;
    const data = await professeurService.getAll(classe);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Récupère un professeur par son ID
 * @async
 * @function getOne
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.id - ID du professeur
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint GET pour récupérer un professeur spécifique par son ID
 * @example
 * GET /professeurs/507f1f77bcf86cd799439011
 */
exports.getOne = async (req, res) => {
  try {
    const prof = await professeurService.getById(req.params.id);
    res.json(prof);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

/**
 * Crée un nouveau professeur
 * @async
 * @function create
 * @param {Object} req - Objet requête Express
 * @param {Object} req.body - Corps de la requête contenant les données du professeur
 * @param {string} req.body.nom - Nom du professeur (obligatoire)
 * @param {string} [req.body.prenom] - Prénom du professeur
 * @param {string} req.body.sexe - Sexe du professeur: HOMME ou FEMME (obligatoire)
 * @param {Date} [req.body.date_naissance] - Date de naissance
 * @param {string} [req.body.adresse] - Adresse du professeur
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint POST pour créer un nouveau professeur
 * @example
 * POST /professeurs
 * Body: { "nom": "Dupont", "prenom": "Marie", "sexe": "FEMME" }
 */
exports.create = async (req, res) => {
  try {
    const prof = await professeurService.create(req.body);
    res.status(201).json(prof);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/**
 * Met à jour un professeur existant
 * @async
 * @function update
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.id - ID du professeur à mettre à jour
 * @param {Object} req.body - Corps de la requête contenant les nouvelles données
 * @param {string} [req.body.nom] - Nouveau nom
 * @param {string} [req.body.prenom] - Nouveau prénom
 * @param {string} [req.body.sexe] - Nouveau sexe
 * @param {Date} [req.body.date_naissance] - Nouvelle date de naissance
 * @param {string} [req.body.adresse] - Nouvelle adresse
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint PUT pour mettre à jour un professeur existant
 * @example
 * PUT /professeurs/507f1f77bcf86cd799439011
 * Body: { "nom": "Martin" }
 */
exports.update = async (req, res) => {
  try {
    const prof = await professeurService.update(req.params.id, req.body);
    res.json(prof);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

/**
 * Supprime un professeur
 * @async
 * @function remove
 * @param {Object} req - Objet requête Express
 * @param {Object} req.params - Paramètres de route
 * @param {string} req.params.id - ID du professeur à supprimer
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 * @description Endpoint DELETE pour supprimer un professeur de la base de données
 * @example
 * DELETE /professeurs/507f1f77bcf86cd799439011
 */
exports.remove = async (req, res) => {
  try {
    await professeurService.delete(req.params.id);
    res.json({ message: "Professeur supprimé avec succès" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
