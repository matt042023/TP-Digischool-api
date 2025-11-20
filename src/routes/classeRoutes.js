const express = require("express");
const ClasseController = require("../controllers/classeController.js");

const router = express.Router();

router.get("/", ClasseController.getAll);
router.get("/:id", ClasseController.getById);
router.post("/", ClasseController.create);
router.put("/:id", ClasseController.update);
router.delete("/:id", ClasseController.delete);

module.exports = router;
