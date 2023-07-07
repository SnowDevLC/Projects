const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4, //valor generado automáticamente
        validate: {
          isUppercase: true, // Validación: letras en mayúsculas
          isAlpha: true, // Validación: solo letras alfabéticas
          isLength: (value) => { // Validación: longitud de 3 letras
            if (value.length !== 3)
              throw new Error("ID tiene que ser tres letras");
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.ENUM("Africa", "America", "Antarctica", "Asia", "Europe", "Oceania"),
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "countries",
    }
  );
};
