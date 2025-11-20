const express = require('express');
const router = express.Router();
const NotesController = require('../controllers/notesController');

router.get('/', NotesController.getAll);
router.get('/:id', NotesController.getById);
router.post('/', NotesController.create);
router.put('/:id', NotesController.update);
router.delete('/:id', NotesController.delete);

module.exports = router;
