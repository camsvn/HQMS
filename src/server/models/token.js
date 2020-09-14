const Sequelize = require("sequelize");
const db = require("../config/database");

const token = db.define(
  "Token",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: "ID",
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATEONLY,
      field: "Date",
      defaultValue: Sequelize.NOW,
    },
    doctorID: {
      type: Sequelize.INTEGER,
      field: "DoctorID",
    },
    docName: {
      type: Sequelize.STRING,
      field: "Name",
    },
    token: {
      type: Sequelize.INTEGER,
      field: "Token",
      defaultValue: 0,
    },
    onBreak: {
      type: Sequelize.BOOLEAN,
      field: "onBreak",
      defaultValue: false,
    },
    onBreakComment: {
      type: Sequelize.STRING,
      field: "Comment",
    },
  },
  { timestamps: false }
);

module.exports = token;
