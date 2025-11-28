const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gestion des notes
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Liste toutes les notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Liste des notes récupérée
 */
router.get('/', notesController.getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Récupère une note par ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Note trouvée
 *       404:
 *         description: Note non trouvée
 */
router.get('/:id', notesController.getNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crée une nouvelle note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eleveId:
 *                 type: string
 *               matiereId:
 *                 type: string
 *               valeur:
 *                 type: number
 *     responses:
 *       201:
 *         description: Note créée
 */
router.post('/', notesController.createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Met à jour une note par ID
 *     tags: [Notes]
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
 *               valeur:
 *                 type: number
 *     responses:
 *       200:
 *         description: Note mise à jour
 *       404:
 *         description: Note non trouvée
 */
router.put('/:id', notesController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Supprime une note par ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Note supprimée
 *       404:
 *         description: Note non trouvée
 */
router.delete('/:id', notesController.deleteNote);

module.exports = router;
