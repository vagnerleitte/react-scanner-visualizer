const Sequelize = require("sequelize");
const database = require("../../db");

const Child = database.define("child", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imported_path: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  line: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  column: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Child;
