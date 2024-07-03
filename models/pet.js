'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Owner }) {
      // define association here
      this.belongsTo(Owner, { foreignKey: 'ownerId' });
    }
  }
  Pet.init({
    id: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4
    },
    animal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
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
    },
    description: DataTypes.STRING,
    ownerId: DataTypes.CHAR(36)
  }, {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets'
  });
  return Pet;
};
