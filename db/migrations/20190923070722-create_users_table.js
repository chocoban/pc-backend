'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      email: { 
        type: Sequelize.STRING 
      }
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users');
  }
};
