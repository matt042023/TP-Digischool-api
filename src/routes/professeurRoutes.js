const router = require("express").Router();
const controller = require("../controllers/professeurController");

/**
 * @swagger
 * tags:
 *   name: Professeurs
 *   description: Gestion des professeurs
 */

/**
 * @swagger
 * /professeurs:
 *   get:
 *     summary: Liste tous les professeurs
 *     tags: [Professeurs]
 *     responses:
 *       200:
 *         description: Liste récupérée
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /professeurs/{id}:
 *   get:
 *     summary: Récupère un professeur par ID
 *     tags: [Professeurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Professeur trouvé
 *       404:
 *         description: Professeur non trouvé
 */
router.get("/:id", controller.getOne);

/**
 * @swagger
 * /professeurs:
 *   post:
 *     summary: Crée un professeur
 *     tags: [Professeurs]
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
 *       201:
 *         description: Professeur créé
 */
router.post("/", controller.create);

/**
 * @swagger
 * /professeurs/{id}:
 *   put:
 *     summary: Met à jour un professeur par ID
 *     tags: [Professeurs]
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
 *               prenom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professeur mis à jour
 *       404:
 *         description: Professeur non trouvé
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /professeurs/{id}:
 *   delete:
 *     summary: Supprime un professeur par ID
 *     tags: [Professeurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Professeur supprimé
 *       404:
 *         description: Professeur non trouvé
 */
router.delete("/:id", controller.remove);

module.exports = router;
