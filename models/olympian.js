'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    team: DataTypes.STRING
  }, {timestamps: false});
  Olympian.associate = function(models) {
    Olympian.belongsToMany(models.Sport, {through: models.Olympian_Sport, foreignKey: 'OlympianId', onDelete: "CASCADE"})
  }
  return Olympian;
};
