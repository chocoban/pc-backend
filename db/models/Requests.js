export default (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      payment: {
        allowNull: false,
        type: DataTypes.ENUM('cash', 'mobileMoney'),
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
        }
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    }
  );
  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'author'
    });
  };

  return Request;
};
