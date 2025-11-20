const express = require('express');
const router = express.Router();
const TrimestreController = require('../controllers/trimestreController');

router.get('/', TrimestreController.getAll);
router.get('/:id', TrimestreController.getById);
router.post('/', TrimestreController.create);
router.put('/:id', TrimestreController.update);
router.delete('/:id', TrimestreController.delete);

module.exports = router;
