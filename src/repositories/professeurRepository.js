/**
 * @fileoverview Repository pour la gestion des opérations de base de données des professeurs
 * @module repositories/professeurRepository
 */

const professeurs = require("../models/Professeur");

/**
 * Récupère tous les professeurs
 * @returns {Promise<Array>} Liste de tous les professeurs
 */
exports.findAll = () => professeurs.find();

/**
 * Récupère un professeur par son ID
 * @param {string} id - ID du professeur à récupérer
 * @returns {Promise<Object|null>} Le professeur trouvé, ou null si non trouvé
 */
exports.findById = (id) => professeurs.findById(id);

/**
 * Crée un nouveau professeur dans la base de données
 * @param {Object} data - Données du professeur à créer
 * @param {string} data.nom - Nom du professeur
 * @param {string} [data.prenom] - Prénom du professeur
 * @param {string} data.sexe - Sexe du professeur (HOMME ou FEMME)
 * @param {Date} [data.date_naissance] - Date de naissance
 * @param {string} [data.adresse] - Adresse du professeur
 * @returns {Promise<Object>} Le professeur créé
 */
exports.create = (data) => professeurs.create(data);

/**
 * Met à jour un professeur existant
 * @param {string} id - ID du professeur à mettre à jour
 * @param {Object} data - Nouvelles données du professeur
 * @returns {Promise<Object|null>} Le professeur mis à jour, ou null si non trouvé
 */
exports.update = (id, data) =>
  professeurs.findByIdAndUpdate(id, data, { new: true });

/**
 * Supprime un professeur de la base de données
 * @param {string} id - ID du professeur à supprimer
 * @returns {Promise<Object|null>} Le professeur supprimé, ou null si non trouvé
 */
exports.remove = (id) => professeurs.findByIdAndDelete(id);
