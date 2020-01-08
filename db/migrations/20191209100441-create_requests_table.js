'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment: {
        allowNull: false,
        type: Sequelize.ENUM('cash', 'mobileMoney'),
        defaultValue: 'cash',
        validate: {
          notEmpty: {
            args: true,
            msg: 'Payment cannot be empty',
          },
          isIn: {
            args: [['cash', 'mobileMoney']],
            msg: 'Payment must be cash or mobile money'
          }
        },
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('Requests');
  }
};
