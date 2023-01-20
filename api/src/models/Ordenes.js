const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ordenes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    numeroDeOrden: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "CREATE",
    },
  });
};
