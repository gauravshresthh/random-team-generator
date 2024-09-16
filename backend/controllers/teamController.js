const { Team, Player } = require('../models');

exports.create = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'team not found' });
    await team.update(req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'team not found' });
    await team.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

exports.generateTeams = async (req, res) => {
  try {
    const title = req.body.title;
    const teams = await Team.findAll();
    const players = await Player.findAll();

    if (teams.length === 0 || players.length === 0) {
      return res.status(400).json({ error: 'No players or teams available' });
    }

    // Group players by skill level
    const skillGroups = {};
    for (let i = 1; i <= 5; i++) {
      skillGroups[i] = players.filter((player) => player.skill === i);
    }

    const teamAssignments = teams.map((team) => ({
      teamName: team.name,
      players: [],
    }));

    let currentTeamIndex = 0;

    for (let skill = 1; skill <= 5; skill++) {
      while (skillGroups[skill].length > 0) {
        const player = skillGroups[skill].shift();
        const team = teamAssignments[currentTeamIndex];

        team.players.push(player);
        currentTeamIndex = (currentTeamIndex + 1) % teamAssignments.length;
      }
    }

    teamAssignments.forEach((team) => {
      team.players = shuffleArray(team.players);
    });

    const allPlayers = teamAssignments.flatMap((team) => team.players);
    const numSwaps = Math.floor(allPlayers.length / 2); // Define number of swaps

    for (let i = 0; i < numSwaps; i++) {
      const teamIndex1 = Math.floor(Math.random() * teamAssignments.length);
      const teamIndex2 =
        (teamIndex1 +
          Math.floor(Math.random() * (teamAssignments.length - 1)) +
          1) %
        teamAssignments.length;

      if (
        teamAssignments[teamIndex1].players.length > 0 &&
        teamAssignments[teamIndex2].players.length > 0
      ) {
        const player1Index = Math.floor(
          Math.random() * teamAssignments[teamIndex1].players.length
        );
        const player2Index = Math.floor(
          Math.random() * teamAssignments[teamIndex2].players.length
        );

        const player1 = teamAssignments[teamIndex1].players.splice(
          player1Index,
          1
        )[0];
        const player2 = teamAssignments[teamIndex2].players.splice(
          player2Index,
          1
        )[0];

        teamAssignments[teamIndex1].players.push(player2);
        teamAssignments[teamIndex2].players.push(player1);
      }
    }

    res.json({ title, teams: teamAssignments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
