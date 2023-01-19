const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "facturas",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      numeroFactura: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
      },
      pagoId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamp: true,
      paranoid: true,
    }
  );
};
