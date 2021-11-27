const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");

const userRoute = require("./Routes/User");

app.use(cors());
app.use(bodyparser.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRoute);

app.listen(3001, (req, res) => {
  console.log("Le serveur est en route sur le port : 3001");
});
