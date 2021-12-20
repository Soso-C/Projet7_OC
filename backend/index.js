const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv').config()
const userRoute = require("./Routes/User");
const postRoute = require("./Routes/Post");
const path = require('path');
const auth = require("./middleware/auth_middleware")


// Ratelimite secure request

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // maximum 100 connexion en 15 minutes
  max: 1000
});

app.use(apiLimiter);


// Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Packages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// jwt


// Routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Multer
app.use('/images', express.static(path.join(__dirname, 'images')));

// Server
app.listen(3001, (req, res) => {
  console.log("Le serveur est en route sur le port : 3001");
});


