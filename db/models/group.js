'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Location }) {
      // define association here
      this.hasMany(Location, { through: 'Locations', foreignKey: 'locationId' })
    }
  };
  Group.init({
    name: DataTypes.STRING,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
