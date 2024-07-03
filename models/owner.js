'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pet }) {
      // define association here
      this.hasMany(Pet, { foreignKey: 'ownerId', as: 'pets' });
    }
  }
  Owner.init({
    id: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isInt: true, notEmpty: true }
    }
  }, {
    sequelize,
    modelName: 'Owner',
    tableName: 'owners'
  });
  return Owner;
};
