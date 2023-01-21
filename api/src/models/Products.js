const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
      },

      descuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      typeProduct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 1.0,
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      timestamp: true,
      paranoid: true,
    }
  );
};
