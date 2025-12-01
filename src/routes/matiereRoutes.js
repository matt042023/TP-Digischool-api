const express = require("express");
const MatiereController = require("../controllers/matiereController.js");

const router = express.Router();

/**
 * Routes pour la gestion des matières.
 * @module routes/matiereRoutes
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
 * Récupère toutes les matières.
 * @name GET /matieres
 * @function
 * @memberof module:routes/matiereRoutes
 * @param {ExpressRequest} req - Requête Express
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /matieres:
 *   get:
 *     summary: Liste toutes les matières
 *     tags: [Matieres]
 *     responses:
 *       200:
 *         description: Liste récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nom:
 *                     type: string
 */
router.get("/", MatiereController.getAll);

/**
 * Récupère une matière par son ID.
 * @name GET /matieres/:id
 * @function
 * @memberof module:routes/matiereRoutes
 * @param {ExpressRequest} req - Requête Express contenant l'ID (params.id)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /matieres/{id}:
 *   get:
 *     summary: Récupère une matière par ID
 *     tags: [Matieres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Matière trouvée
 *       404:
 *         description: Matière non trouvée
 */
router.get("/:id", MatiereController.getById);

/**
 * Crée une nouvelle matière.
 * @name POST /matieres
 * @function
 * @memberof module:routes/matiereRoutes
 * @param {ExpressRequest} req - Requête Express contenant les données de la matière (body)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /matieres:
 *   post:
 *     summary: Crée une nouvelle matière
 *     tags: [Matieres]
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
 *     responses:
 *       201:
 *         description: Matière créée
 */
router.post("/", MatiereController.create);

/**
 * Met à jour une matière par son ID.
 * @name PUT /matieres/:id
 * @function
 * @memberof module:routes/matiereRoutes
 * @param {ExpressRequest} req - Requête Express contenant (params.id + body)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /matieres/{id}:
 *   put:
 *     summary: Met à jour une matière par ID
 *     tags: [Matieres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
 *         description: Matière mise à jour
 *       404:
 *         description: Matière non trouvée
 */
router.put("/:id", MatiereController.update);

/**
 * Supprime une matière par son ID.
 * @name DELETE /matieres/:id
 * @function
 * @memberof module:routes/matiereRoutes
 * @param {ExpressRequest} req - Requête Express contenant l'ID (params.id)
 * @param {ExpressResponse} res - Réponse Express
 * @returns {Promise<void>}
 *
 * @swagger
 * /matieres/{id}:
 *   delete:
 *     summary: Supprime une matière par ID
 *     tags: [Matieres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Matière supprimée
 *       404:
 *         description: Matière non trouvée
 */
router.delete("/:id", MatiereController.delete);

module.exports = router;
