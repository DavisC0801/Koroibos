'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian_Sport = sequelize.define('Olympian_Sport', {
    event: DataTypes.STRING,
    medal: DataTypes.STRING,
    SportId: DataTypes.BIGINT,
    OlympianId: DataTypes.BIGINT
  }, {});
  Olympian_Sport.associate = function(models) {
    Olympian_Sport.belongsTo(models.Olympian, {foreignKey: 'OlympianId', as: 'olympian'})
    Olympian_Sport.belongsTo(models.Sport, {foreignKey: 'SportId', as: 'sport'})
  };
  return Olympian_Sport;
};
