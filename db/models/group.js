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
      this.belongsTo(Location, { foreignKey: 'locationid' })
    }
  };
  Group.init({
    name: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    locationid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
