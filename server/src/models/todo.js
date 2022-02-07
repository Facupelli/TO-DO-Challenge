const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("todo", {
    //id se genera solo, sequelize por defecto lo genera solo
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
