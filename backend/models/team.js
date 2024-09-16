module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define('Team', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Team.associate = function (models) {
    Team.hasMany(models.Player, { foreignKey: 'teamId', as: 'players' });
  };
  return Team;
};
