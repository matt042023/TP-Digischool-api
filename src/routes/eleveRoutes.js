const router = require("express").Router();
const controller = require("../controllers/eleveController");

/**
 * @swagger
 * tags:
 *   name: Eleves
 *   description: Gestion des élèves
 */

/**
 * @swagger
 * /eleves:
 *   get:
 *     summary: Récupère la liste de tous les élèves
 *     tags: [Eleves]
 *     responses:
 *       200:
 *         description: Liste des élèves récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de l'élève
 *                   nom:
 *                     type: string
 *                     description: Nom de l'élève
 *                   prenom:
 *                     type: string
 *                     description: Prénom de l'élève
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /eleves/{id}:
 *   get:
 *     summary: Récupère un élève par son ID
 *     tags: [Eleves]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élève
 *     responses:
 *       200:
 *         description: Élève trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *       404:
 *         description: Élève non trouvé
 */
router.get("/:id", controller.getOne);

/**
 * @swagger
 * /eleves:
 *   post:
 *     summary: Crée un nouvel élève
 *     tags: [Eleves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'élève
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'élève
 *     responses:
 *       201:
 *         description: Élève créé avec succès
 */
router.post("/", controller.create);

/**
 * @swagger
 * /eleves/{id}:
 *   put:
 *     summary: Met à jour un élève par son ID
 *     tags: [Eleves]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élève
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Élève mis à jour avec succès
 *       404:
 *         description: Élève non trouvé
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /eleves/{id}:
 *   delete:
 *     summary: Supprime un élève par son ID
 *     tags: [Eleves]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'élève
 *     responses:
 *       200:
 *         description: Élève supprimé avec succès
 *       404:
 *         description: Élève non trouvé
 */
router.delete("/:id", controller.remove);

module.exports = router;
