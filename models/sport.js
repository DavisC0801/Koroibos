'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('Sport', {
    name: DataTypes.STRING,
    game_id: DataTypes.BIGINT
  }, {});
  Sport.associate = function(models) {
    Sport.belongsTo(models.Game, {foreignKey: 'game_id', as: 'game'})
    Sport.belongsToMany(models.Olympian, {through: models.Olympian_Sport, foreignKey: 'sport_id', onDelete: "CASCADE"})
  };
  return Sport;
};
