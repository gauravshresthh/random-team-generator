const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/team', teamController.create);
router.put('/team/:id', teamController.update);
router.delete('/team/:id', teamController.delete);
router.get('/teams', teamController.findAll);
router.post('/generate-teams', teamController.generateTeams);

module.exports = router;
