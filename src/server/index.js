const express = require("express");
const os = require("os");

//Local imports
const config = require("./config/appConfig");
const db = require("./config/database");
const queries = require("./models/queries");

const app = express();

const listen = () => {
  app.listen(config.port || 8080, () =>
    console.log(`Listening on port ${config.port || 8080}!`)
  );
};

db.authenticate()
  .then(async () => {
    console.log(`Connected to ${config.sql.server}`);
    await listen();

    // db.close()
    //   .then(console.log("Connection Closed"))
    //   .catch((err) => console.log(`Error Cosing Connection ${err}`));
  })
  .catch((err) => console.log(`Connection Error ${err}`));

//for production
app.use(express.static("dist"));

//routes
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get("/api/getDoctors", async (req, res) => {
  // const opVisit = require("./models/opVisit");
  // try {
  //   const opList = await opVisit.findAll({
  //     attributes: ["id", "opID", "dateTime", "doctorID"],
  //     limit: 1000,
  //     order: [["id", "DESC"]],
  //   });
  // } catch (err) {
  //   res.status(500);
  //   res.json("ERROR 500 | " + err);
  // }
  const [result, metadata] = await db.query(queries.queryDoc);
  res.json(result);
});
