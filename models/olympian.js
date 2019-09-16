'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    team: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.belongsToMany(models.Sport, {through: models.Olympian_Sport, foreignKey: 'olympian_id', onDelete: "CASCADE"})
  }
  return Olympian;
};
