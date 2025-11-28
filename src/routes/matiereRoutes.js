const express = require("express");
const MatiereController = require("../controllers/matiereController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Matieres
 *   description: Gestion des matières
 */

/**
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
