const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    peso: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tiempoVida: {
      type: DataTypes.INTEGER,
    },
    imagen:{
      type: DataTypes.TEXT,
    }
  });
};
