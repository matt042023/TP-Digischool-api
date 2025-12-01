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

/**
 * @swagger
 * /notes/professeur/{professeurId}:
 *   get:
 *     summary: Récupère les élèves et leurs notes selon un professeur
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: professeurId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du professeur
 *     responses:
 *       200:
 *         description: Liste des notes avec les informations des élèves
 *       400:
 *         description: Paramètres invalides
 */
router.get('/professeur/:professeurId', notesController.getNotesByProfesseur);

/**
 * @swagger
 * /notes/trimestre/{idTrimestre}/classe/{idClasse}:
 *   get:
 *     summary: Récupère les notes des élèves par matière avec le nom du professeur selon le trimestre et la classe
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: idTrimestre
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du trimestre
 *       - in: path
 *         name: idClasse
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la classe
 *     responses:
 *       200:
 *         description: Liste des notes avec les informations des élèves, matières et professeurs
 *       400:
 *         description: Paramètres invalides
 */
router.get('/trimestre/:idTrimestre/classe/:idClasse', notesController.getNotesByTrimestreAndClasse);
/**
 * @swagger
* /notes/eleve/{eleveId}:
 *   get:
 *     summary: Récupère toutes les notes d'un élève
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: eleveId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'élève dont on souhaite récupérer les notes
 *     responses:
 *       200:
 *         description: Liste des notes de l'élève
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   note:
 *                     type: number
 *                   avis:
 *                     type: string
 *                   avancement:
 *                     type: number
 *                   idEleve:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                       prenom:
 *                         type: string
 *                   idMatiere:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                   idProf:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                   idClasse:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                   idTrimestre:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nom:
 *                         type: string
 *                   dateSaisie:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Aucune note trouvée pour cet élève
 */
router.get("/eleve/:eleveId", notesController.getNotesByEleve);

module.exports = router;
