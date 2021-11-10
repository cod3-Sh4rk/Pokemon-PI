const { DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    //no defino el ID porque sequelize lo hace por defecto
    name:{
      type: DataTypes.STRING,
      allowNull: false,
     
    }
  })
};