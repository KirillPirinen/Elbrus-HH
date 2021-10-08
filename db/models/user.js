'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Group}) {
      // define association here
     this.belongsTo(Group, {foreignKey: 'groupid'});
    }
  };
  User.init({
    firstname: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    lastname: DataTypes.STRING,
    groupid: DataTypes.INTEGER,
    graduationdate: DataTypes.DATEONLY,
    telegram: DataTypes.TEXT,
    github: DataTypes.TEXT,
    hhcv: DataTypes.TEXT,
    pdfcv: DataTypes.TEXT,
    userphoto: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
