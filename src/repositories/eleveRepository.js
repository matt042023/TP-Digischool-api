/**
 * @fileoverview Repository pour la gestion des opérations de base de données des élèves
 * @module repositories/eleveRepository
 */

const eleves = require("../models/Eleve");

/**
 * Récupère tous les élèves avec leurs classes associées
 * @returns {Promise<Array>} Liste de tous les élèves avec population de la classe
 */
exports.findAll = () => eleves.find().populate("classe");

/**
 * Récupère un élève par son ID avec sa classe associée
 * @param {string} id - ID de l'élève à récupérer
 * @returns {Promise<Object|null>} L'élève trouvé avec sa classe, ou null si non trouvé
 */
exports.findById = (id) => eleves.findById(id).populate("classe");

/**
 * Récupère tous les élèves regroupés par classe avec agrégation MongoDB
 * @returns {Promise<Array>} Liste des classes avec leurs élèves et le total par classe
 * @description Utilise l'agrégation MongoDB pour grouper les élèves par classe,
 * incluant les détails de chaque élève et le nombre total d'élèves par classe
 * @example
 * // Retourne un tableau d'objets avec la structure suivante:
 * [
 *   {
 *     classeId: ObjectId,
 *     classeNom: "6ème A",
 *     eleves: [{_id, nom, prenom, sexe, date_naissance, adresse}, ...],
 *     total: 25
 *   }
 * ]
 */
exports.findAllGroupedByClasse = async () => {
  return await eleves.aggregate([
    {
      $lookup: {
        from: "classes",
        localField: "classe",
        foreignField: "_id",
        as: "classeDetails"
      }
    },
    {
      $unwind: "$classeDetails"
    },
    {
      $group: {
        _id: "$classe",
        classe: { $first: "$classeDetails" },
        eleves: {
          $push: {
            _id: "$_id",
            nom: "$nom",
            prenom: "$prenom",
            sexe: "$sexe",
            date_naissance: "$date_naissance",
            adresse: "$adresse"
          }
        },
        total: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        classeId: "$_id",
        classeNom: "$classe.nom",
        eleves: 1,
        total: 1
      }
    },
    {
      $sort: { classeNom: 1 }
    }
  ]);
};

/**
 * Crée un nouvel élève dans la base de données
 * @param {Object} data - Données de l'élève à créer
 * @param {string} data.nom - Nom de l'élève
 * @param {string} [data.prenom] - Prénom de l'élève
 * @param {string} data.classe - ID de la classe
 * @param {string} data.sexe - Sexe de l'élève (HOMME ou FEMME)
 * @param {Date} [data.date_naissance] - Date de naissance
 * @param {string} [data.adresse] - Adresse de l'élève
 * @returns {Promise<Object>} L'élève créé
 */
exports.create = (data) => eleves.create(data);

/**
 * Met à jour un élève existant
 * @param {string} id - ID de l'élève à mettre à jour
 * @param {Object} data - Nouvelles données de l'élève
 * @returns {Promise<Object|null>} L'élève mis à jour, ou null si non trouvé
 */
exports.update = (id, data) =>
  eleves.findByIdAndUpdate(id, data, { new: true });

/**
 * Supprime un élève de la base de données
 * @param {string} id - ID de l'élève à supprimer
 * @returns {Promise<Object|null>} L'élève supprimé, ou null si non trouvé
 */
exports.remove = (id) => eleves.findByIdAndDelete(id);

/**
 * Récupère tous les élèves d'une classe spécifique
 * @param {string} classeId - ID de la classe
 * @returns {Promise<Array>} Liste des élèves avec uniquement nom et prénom
 * @description Ne retourne que les champs nom et prénom pour optimiser les performances
 */
exports.findByClasse = (classeId) => {
  return eleves
    .find({ classe: classeId })
    .select('nom prenom');  // récupère que le nom et le prénom
};