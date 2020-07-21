const express = require("express");
const os = require("os");
const socket = require("socket.io");

//Local imports
const config = require("./config/appConfig");
const db = require("./config/database");
// const queries = require("./models/queries");
const mockData = require("./models/mockData");

const localDS = [...mockData];

const app = express();

const server = app.listen(config.port || 8080, () =>
  console.log(`Listening on port ${config.port || 8080}!`)
);

db.authenticate()
  .then(async () => {
    console.log(`Connected to ${config.sql.server}`);
    await server;
  })
  .catch((err) => console.log(`Connection Error ${err}`));

//Static File - Production
app.use(express.static("dist"));

//Socket Setup
var io = socket(server);
io.on("connection", (socket) => {
  var client = socket.handshake.address.slice(7);
  console.log(`${client} Socket Connected`, socket.id);

  socket.emit("token-update", { localDS });

  socket.on("increment", (data) => {
    console.log(`Increment ${data.id}`);
    let indexofID = localDS.findIndex(({ id }) => id === data.id);
    localDS[indexofID].currentToken += 1;
    console.log(
      `Next token of ${data.id} is ${localDS[indexofID].currentToken}`
    );
    io.sockets.emit("token-update", { localDS });
    // socket.emit("token-update", { localDS });
    // console.log("Update Event Emitted");
  });

  socket.on("decrement", (data) => {
    console.log(`Decrement ${data.id}`);
    let indexofID = localDS.findIndex(({ id }) => id === data.id);
    localDS[indexofID].currentToken !== 0
      ? (localDS[indexofID].currentToken -= 1)
      : (localDS[indexofID].currentToken = 0);
    console.log(
      `Next token of ${data.id} is ${localDS[indexofID].currentToken}`
    );
    io.sockets.emit("token-update", { localDS });
    // socket.emit("token-update", { localDS });
    // console.log("Update Event Emitted");
  });

  socket.on("disconnect", () => {
    console.log(`${client} Socket Disonnected`, socket.id);
  });
});

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

  // const [result, metadata] = await db.query(queries.queryDoc);
  // res.json(result);
  res.json(localDS);
});
