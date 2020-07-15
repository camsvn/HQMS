const Sequelize = require("sequelize");
const db = require("../config/database");

const opVisit = db.define(
  "OPVisit",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: "ID",
      autoIncrement: true,
    },
    opID: {
      type: Sequelize.INTEGER,
      field: "OPRegisterID",
    },
    num: {
      type: Sequelize.INTEGER,
      field: "No",
    },
    dateTime: {
      type: Sequelize.DATE,
      field: "DateTime",
    },
    doctorID: {
      type: Sequelize.INTEGER,
      field: "DoctorID",
    },
    regFee: {
      type: Sequelize.DECIMAL(19, 4),
      field: "RegistrationFee",
    },
    consultationFee: {
      type: Sequelize.DECIMAL(19, 4),
      field: "ConsultationFee",
    },
    discount: {
      type: Sequelize.DECIMAL(19, 4),
      field: "Discount",
    },
    narration: {
      type: Sequelize.STRING,
      field: "Narration",
    },
    finYearID: {
      type: Sequelize.INTEGER,
      field: "FinancialYearID",
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      field: "Deleted",
    },
    uid: {
      type: Sequelize.INTEGER,
      field: "UserID",
    },
    isConsulted: {
      type: Sequelize.BOOLEAN,
      field: "IsConsulted",
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = opVisit;
