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
    // opID: {
    //   type: Sequelize.INTEGER,
    //   field: "OPRegisterID",
    // },
    // num: {
    //   type: Sequelize.INTEGER,
    //   field: "No",
    // },
    // regFee: {
    //   type: Sequelize.DECIMAL(19, 4),
    //   field: "RegistrationFee",
    // },
    // consultationFee: {
    //   type: Sequelize.DECIMAL(19, 4),
    //   field: "ConsultationFee",
    // },
    // discount: {
    //   type: Sequelize.DECIMAL(19, 4),
    //   field: "Discount",
    // },
    // deleted: {
    //   type: Sequelize.BOOLEAN,
    //   field: "Deleted",
    // },
    // uid: {
    //   type: Sequelize.INTEGER,
    //   field: "UserID",
    // },
    // isConsulted: {
    //   type: Sequelize.BOOLEAN,
    //   field: "IsConsulted",
    //   defaultValue: false,
    // },
  },
  { timestamps: false }
);

module.exports = token;
