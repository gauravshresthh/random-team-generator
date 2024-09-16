const { Player } = require('../models');

exports.create = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    await player.update(req.body);
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    await player.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
