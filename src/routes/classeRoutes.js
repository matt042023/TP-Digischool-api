const express = require("express");
const ClasseController = require("../controllers/classeController.js");

const router = express.Router();

/**
 * Routes pour la gestion des classes.
 * @module routes/classeRoutes
 */

/**
 * @typedef {object} ExpressRequest
 * @description Objet représentant la requête Express
 */

/**
 * @typedef {object} ExpressResponse
 * @description Objet représentant la réponse Express
 */

/**
 * Récupère la liste de toutes les classes.
 * @name GET /classes
 * @function
 * @memberof module:routes/classeRoutes
 * @param {ExpressRequest} req - Requête Express
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /classes:
 *   get:
 *     summary: Récupère la liste de toutes les classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Liste des classes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la classe
 *                   nom:
 *                     type: string
 *                     description: Nom de la classe
 */
router.get("/", ClasseController.getAll);

/**
 * Récupère une classe par son ID.
 * @name GET /classes/:id
 * @function
 * @memberof module:routes/classeRoutes
 * @param {ExpressRequest} req - Requête Express contenant l'ID (params.id)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Récupère une classe par son ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la classe
 *     responses:
 *       200:
 *         description: Classe trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nom:
 *                   type: string
 *       404:
 *         description: Classe non trouvée
 */
router.get("/:id", ClasseController.getById);

/**
 * Crée une nouvelle classe.
 * @name POST /classes
 * @function
 * @memberof module:routes/classeRoutes
 * @param {ExpressRequest} req - Requête Express contenant les données de la classe (body)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /classes:
 *   post:
 *     summary: Crée une nouvelle classe
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de la classe
 *     responses:
 *       201:
 *         description: Classe créée avec succès
 */
router.post("/", ClasseController.create);

/**
 * Met à jour une classe par son ID.
 * @name PUT /classes/:id
 * @function
 * @memberof module:routes/classeRoutes
 * @param {ExpressRequest} req - Requête Express contenant (params.id + body)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Met à jour une classe par son ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la classe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Classe mise à jour avec succès
 *       404:
 *         description: Classe non trouvée
 */
router.put("/:id", ClasseController.update);

/**
 * Supprime une classe par son ID.
 * @name DELETE /classes/:id
 * @function
 * @memberof module:routes/classeRoutes
 * @param {ExpressRequest} req - Requête Express contenant l'ID (params.id)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Supprime une classe par son ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la classe
 *     responses:
 *       200:
 *         description: Classe supprimée avec succès
 *       404:
 *         description: Classe non trouvée
 */
router.delete("/:id", ClasseController.delete);

module.exports = router;
