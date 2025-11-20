const express = require('express');
const router = express.Router();
const trimestreController = require('../controllers/trimestreController');

router.get('/', trimestreController.getAllTrimestres);
router.get('/:id', trimestreController.getTrimestreById);
router.post('/', trimestreController.createTrimestre);
router.put('/:id', trimestreController.updateTrimestre);
router.delete('/:id', trimestreController.deleteTrimestre);

module.exports = router;
