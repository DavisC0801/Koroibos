'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian_Sport = sequelize.define('Olympian_Sport', {
    event: DataTypes.STRING,
    medal: DataTypes.STRING,
    sport_id: DataTypes.BIGINT,
    olympian_id: DataTypes.BIGINT
  }, {});
  Olympian_Sport.associate = function(models) {
    Olympian_Sport.belongsTo(models.Olympian, {foreignKey: 'olympian_id', as: 'olympian'})
    Olympian_Sport.belongsTo(models.Sport, {foreignKey: 'sport_id', as: 'sport'})
  };
  return Olympian_Sport;
};
