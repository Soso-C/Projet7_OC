const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv').config()


// ratelimite secure request

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // maximum 100 connexion en 15 minutes
  max: 100
});

app.use(apiLimiter);

// Main route
const userRoute = require("./Routes/User");
const postRoute = require("./Routes/Post");

// cors
app.use(cors());


// Packages
app.use(bodyparser.json());
app.use(cookieParser());
app.use(helmet());



// routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);


// Server
app.listen(3001, (req, res) => {
  console.log("Le serveur est en route sur le port : 3001");
});
