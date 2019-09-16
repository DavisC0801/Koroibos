'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('Sport', {
    name: DataTypes.STRING,
    GameId: DataTypes.BIGINT
  }, {});
  Sport.associate = function(models) {
    Sport.belongsTo(models.Game, {foreignKey: 'GameId', as: 'game'})
    Sport.belongsToMany(models.Olympian, {through: models.Olympian_Sport, foreignKey: 'SportId', onDelete: "CASCADE"})
  };
  return Sport;
};
