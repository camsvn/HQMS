const express = require("express");
const os = require("os");
const socket = require("socket.io");
const cron = require("node-cron");
const path = require("path");
const { NOW } = require("sequelize");

//Local imports
const config = require("./config/appConfig");
const db = require("./config/database");
const queries = require("./models/queries");
const Token = require("./models/token");
const mockData = require("./models/mockData");

const localDS = [...mockData];
const messages = [];

const app = express();

const server = app.listen(config.port || 8080, () =>
  console.log(`Listening on port ${config.port || 8080}!`)
);

db.authenticate()
  .then(async () => {
    console.log(`Connected to ${config.sql.host}`);
    await server;
  })
  .catch((err) => console.log(`Connection Error ${err}`));

//Static File - Production
// app.use(express.static("dist"));

//Socket Setup
var io = socket(server);
io.on("connection", (socket) => {
  var client = socket.handshake.address.slice(7);
  // console.log(`${client} Socket Connected`, socket.id);

  // socket.emit("token-update", { localDS });
  socket.on("syncdb", async () => {
    await Token.sync();
    // console.log("Syncing DB");
    const [result, metadata] = await db.query(queries.getUniqueDoc);
    result.length &&
      result.map(async (item) => {
        const id = await Token.create(item);
        // console.log(`${item.docName}'s ID is ${id}`);
        io.emit("dbupdated");
      });
  });

  socket.on("getlabresults", async () => {
    const [result, metadata] = await db.query(queries.ltestResult);
    // console.log(result.length);
    result.length && io.emit("labresults", JSON.stringify(result));
  });

  //Corn Scheduler
  cron.schedule("0 1 0 * * *", () => {
    io.emit("sync-dbupdated");
    io.emit("dbupdated");
  });

  socket.emit("getmsg", JSON.stringify(messages));

  socket.on("close", (msg) => console.log(msg));

  socket.on("addmsg", (msg) => {
    messages.push(msg);
    io.emit("getmsg", JSON.stringify(messages));
  });

  socket.on("delmsg", (id) => {
    messages.splice(id, 1);
    io.emit("getmsg", JSON.stringify(messages));
  });

  socket.on("getdoc", async () => {
    Token.findAll({
      where: {
        date: NOW(),
      },
      order: ["docName"],
    }).then((data) => {
      socket.emit("doc", JSON.stringify(data, null, 2));
    });
  });

  // socket.on("dbupdate", (txt) => {
  //   console.log(`Update request from C# ${txt}`);
  // });

  socket.on("token-update", (data) => {
    const { doctorID, token } = data;
    // console.log("Token Update Request");
    Token.update(
      { token },
      {
        where: {
          date: NOW(),
          doctorID,
        },
      }
    ).then((data) => {
      io.emit("dbupdated");
      io.emit("client-syncdb");
    });
  });

  socket.on("onBreak-update", (data) => {
    const { doctorID, onBreak } = data;
    // console.log("Token Update Request");
    Token.update(
      { onBreak },
      {
        where: {
          date: NOW(),
          doctorID,
        },
      }
    ).then((data) => io.emit("dbupdated"));
  });

  socket.on("onBreakMsg-submit", (data) => {
    const { doctorID, onBreakComment } = data;
    // console.log(onBreakComment);
    Token.update(
      { onBreakComment, onBreak: true },
      {
        where: {
          date: NOW(),
          doctorID,
        },
      }
    ).then((data) => io.emit("dbupdated"));
  });

  // socket.on("increment", (data) => {
  //   //   let indexofID = localDS.findIndex(({ id }) => id === data.id);
  //   //   localDS[indexofID].currentToken += 1;
  //   //   io.sockets.emit("token-update", { localDS });
  //   const { doctorID, token } = data;
  //   Token.update({token},{
  //     where: {
  //       doctorID
  //     }
  //   })
  // });

  // socket.on("decrement", (data) => {
  //   //   let indexofID = localDS.findIndex(({ id }) => id === data.id);
  //   //   localDS[indexofID].currentToken !== 0
  //   //     ? (localDS[indexofID].currentToken -= 1)
  //   //     : (localDS[indexofID].currentToken = 0);
  //   //   io.sockets.emit("token-update", { localDS });
  //   const { doctorID, token } = data;
  //   Token.update({token},{
  //     where: {
  //       doctorID
  //     }
  //   })
  // });

  socket.on("disconnect", () => {
    // console.log(`${client} Socket Disonnected`, socket.id);
  });
});

//routes
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get("/api/dbupdate", async (req, res) => {
  res.status(200).send("Update Request Received");
  // console.log("Recived Http Request");
  await Token.sync();
  // console.log("Table Token Model Created");
  const [result, metadata] = await db.query(queries.getUniqueDoc);
  result.length &&
    result.map(async (item) => {
      const id = await Token.create(item);
      // console.log(`${item.docName}'s ID is ${id}`);
      io.emit("dbupdated");
    });
});

app.get("/api/getDoctors", async (req, res) => {
  const [result, metadata] = await db.query(queries.ltestResult);

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
  res.json(result);
});

app.use(express.static("dist"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});
