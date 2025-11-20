const express = require("express");
const MatiereController = require("../controllers/matiereController.js");

const router = express.Router();

router.get("/", MatiereController.getAll);
router.get("/:id", MatiereController.getById);
router.post("/", MatiereController.create);
router.put("/:id", MatiereController.update);
router.delete("/:id", MatiereController.delete);

module.exports = router;
