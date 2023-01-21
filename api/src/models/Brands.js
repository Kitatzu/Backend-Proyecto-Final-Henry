const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("brands", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
  });
};
