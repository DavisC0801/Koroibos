'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Sport, {as: 'sports'})};
  return Game;
};
