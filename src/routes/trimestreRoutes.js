const express = require('express');
const router = express.Router();
const trimestreController = require('../controllers/trimestreController');

/**
 * @swagger
 * tags:
 *   name: Trimestres
 *   description: Gestion des trimestres
 */

/**
 * @swagger
 * /trimestres:
 *   get:
 *     summary: Liste tous les trimestres
 *     tags: [Trimestres]
 *     responses:
 *       200:
 *         description: Liste récupérée
 */
router.get('/', trimestreController.getAllTrimestres);

/**
 * @swagger
 * /trimestres/{id}:
 *   get:
 *     summary: Récupère un trimestre par ID
 *     tags: [Trimestres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Trimestre trouvé
 *       404:
 *         description: Trimestre non trouvé
 */
router.get('/:id', trimestreController.getTrimestreById);

/**
 * @swagger
 * /trimestres:
 *   post:
 *     summary: Crée un nouveau trimestre
 *     tags: [Trimestres]
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
 *       201:
 *         description: Trimestre créé
 */
router.post('/', trimestreController.createTrimestre);

/**
 * @swagger
 * /trimestres/{id}:
 *   put:
 *     summary: Met à jour un trimestre par ID
 *     tags: [Trimestres]
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
 *         description: Trimestre mis à jour
 *       404:
 *         description: Trimestre non trouvé
 */
router.put('/:id', trimestreController.updateTrimestre);

/**
 * @swagger
 * /trimestres/{id}:
 *   delete:
 *     summary: Supprime un trimestre par ID
 *     tags: [Trimestres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Trimestre supprimé
 *       404:
 *         description: Trimestre non trouvé
 */
router.delete('/:id', trimestreController.deleteTrimestre);

module.exports = router;
