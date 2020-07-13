const express = require("express");
const os = require("os");
require('dotenv').config();

const app = express();

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

//for production
app.use(express.static("dist"));

//routes
app.get("/api/getUsername", (req, res) =>  
  res.send({ username: os.userInfo().username })
);



