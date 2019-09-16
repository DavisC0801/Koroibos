'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING
  }, {timestamps: false});
  Game.associate = function(models) {
    Game.hasMany(models.Sport, {as: 'sports'})};
  return Game;
};
