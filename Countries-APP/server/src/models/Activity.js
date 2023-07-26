const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true, //Validación: debe ser un número entero
            min: 1,
            max: 5,
        },
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      season: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      createBy:  {
        type: DataTypes.STRING,
        defaultValue: "Luis"
      },
    },
    {
      timestamps: false,
      tableName: "activities",
    }
  );
};