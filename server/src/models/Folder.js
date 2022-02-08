const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("folder", {
    //id se genera solo, sequelize por defecto lo genera solo
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
