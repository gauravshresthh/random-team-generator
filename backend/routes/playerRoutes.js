const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/player', playerController.create);
router.put('/player/:id', playerController.update);
router.delete('/player/:id', playerController.delete);
router.get('/players', playerController.findAll);

module.exports = router;
