'use strict';
const {
  Model
} = require('sequelize');
const {Enums}=require('../utils/common')
const {FLIGHT_COMPANY,ADMIN,CUSTOMER}=Enums.USER_ROLES
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {through: 'User_Roles'})
    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM,
      values: [FLIGHT_COMPANY,ADMIN,CUSTOMER],
      defaultValue: CUSTOMER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};