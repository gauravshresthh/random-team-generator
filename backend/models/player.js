module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define('Player', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    skill: {
      type: Sequelize.INTEGER,
    },
    teamId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Teams',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
  Player.associate = function (models) {
    Player.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
  };
  return Player;
};
