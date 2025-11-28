const express = require("express");
const ClasseController = require("../controllers/classeController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gestion des classes
 */

/**
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
